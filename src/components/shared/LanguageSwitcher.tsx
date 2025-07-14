'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { locales, localeNames } from '@/lib/i18n/config'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const currentLocale = pathname.split('/')[1]
  
  const handleLocaleChange = (newLocale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:text-foreground/80 text-sm font-medium text-foreground/60">
        <Globe className="h-4 w-4" />
        <span className="flex items-center gap-2">
          <span>{localeNames[currentLocale as keyof typeof localeNames]}</span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className="block py-2 px-3 hover:bg-accent rounded-md text-sm text-foreground/60 hover:text-foreground/80 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="w-6 text-xs font-semibold uppercase">{locale}</span>
              {localeNames[locale]}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}