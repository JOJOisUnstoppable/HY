'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { SparklesText } from "@/components/magicui/sparkles-text"
import { cn } from '@/lib/utils'
import LanguageSwitcher from '../shared/LanguageSwitcher'
import Image from 'next/image'

interface NavItem {
  title: string
  href: string
  categories?: {
    id: string
    title: string
    description: string
  }[]
}

// 添加字典类型定义
interface NavbarDictionary {
  common: {
    home: string
    products: string
    applications: string
    blog: string
    contact: string
    allProducts: string
  },
  spotlights: {
    solarDamperShort: string
  }
}

export function Navbar({ locale, dict, categories }: {
  locale: string,
  dict: NavbarDictionary,
  categories: { id: string; title: string; description: string }[]
}) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { title: dict.common.home, href: `/${locale}` },
    {
      title: dict.common.products,
      href: `/${locale}/products`,
      categories: categories
    },
    { title: dict.common.applications, href: `/${locale}/applications` },
    { title: dict.common.blog, href: `/${locale}/blog` },
    { title: dict.common.contact, href: `/${locale}/contact` },
  ]

  const renderNavLink = (item: NavItem) => {
    if (item.categories) {
      return (
        <NavigationMenu key={item.href}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(
                "transition-colors hover:text-foreground/80 text-sm font-medium",
                pathname === item.href ? "text-foreground" : "text-foreground/60",
                "bg-transparent hover:bg-transparent"
              )}>
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[250px] gap-2 p-1">
                  {item.categories.map((category) => (
                    <li key={category.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/${locale}/products/category/${category.id}`}
                          className="block py-2 px-3 hover:bg-accent rounded-md"
                        >
                          <div>
                            <div>{category.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {category.description}
                            </div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )
    }

    return (
      <NavigationMenu key={item.href}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80 text-sm font-medium px-4 py-2",
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center max-w-7xl mx-auto">
        <div className="mr-4 hidden md:flex">
          <Link href={`/${locale}`} className="mr-12 flex items-center space-x-2">
            <Image src="/logoWithDK.svg" alt="Logo" width={32} height={32} />
            <SparklesText
              sparklesCount={3}
              className='text-sm'>
              DK GasSpring
            </SparklesText>
          </Link>
          <nav className="flex items-center space-x-2 text-sm font-medium">
            {navItems.map(renderNavLink)}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex justify-between md:w-auto">
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Show Menu on Mobile Device">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <nav className="flex flex-col space-y-4 pl-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-foreground/60 transition-colors hover:text-foreground/80 hover:bg-accent/50 py-2 px-3 rounded-md",
                        pathname === item.href && "text-foreground font-medium bg-accent/30"
                      )}
                    >
                      {item.title}
                      {item.categories && (
                        <div className="pl-6 mt-3 space-y-3">
                          {item.categories.map((category) => (
                            <Link
                              key={category.id}
                              href={`/${locale}/products/category/${category.id}`}
                              className="block text-sm text-foreground/50 hover:text-foreground/70 hover:bg-accent/50 transition-colors py-2 px-3 rounded-md"
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href={`/${locale}/spotlights/solar-damper`} className="block md:inline-flex md:w-auto md:ml-0 mx-auto mb-0 group">
              <div className="relative overflow-hidden bg-gradient-to-r from-purple-500/90 to-purple-600/90 hover:from-purple-500 hover:to-purple-600 text-white rounded-full px-4 py-1.5 transition-all duration-300 text-sm font-medium flex items-center gap-2 group-hover:gap-3">
                <span className="bg-white/20 px-1.5 py-0.5 text-[10px] tracking-wider uppercase rounded-sm">New</span>
                <span className="text-sm font-medium">{dict.spotlights.solarDamperShort}</span>
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            </Link>
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
          </div>
          <div className="hidden md:flex">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}