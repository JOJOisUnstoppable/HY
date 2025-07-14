import Link from 'next/link'
import { getDictionary } from '@/lib/i18n/getDictionary'
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'

export default async function NotFound() {
  // 默认使用英文
  const dict = await getDictionary('en')

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-bold text-gray-200">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-2">{dict.error.notFoundTitle}</h2>
      <p className="text-gray-600 mb-8">{dict.error.notFoundDescription}</p>
      <Link href="/en">
        <Button>
          <HomeIcon className="mr-2 h-4 w-4" />
          {dict.error.backToHome}
        </Button>
      </Link>
    </div>
  )
}