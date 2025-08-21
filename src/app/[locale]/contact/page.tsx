import { getDictionary } from '@/lib/i18n/getDictionary'
import { Locale } from '@/lib/i18n/config'
import { ContactForm } from '@/components/contact/ContactForm'
import { Building2, Mail, Phone, MapPin } from 'lucide-react'

export default async function ContactPage(
  props: {
    params: Promise<{ locale: Locale }>
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dict = await getDictionary(locale)

  return (
    <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 联系表单部分 - 现在在左边 */}
        <div className="bg-gray-50 p-8 rounded-lg">

          <ContactForm dict={dict} lang={locale} />
        </div>

        {/* 联系信息部分 - 现在在右边 */}
        <div>
          <h1 className="text-4xl font-bold mb-6">{dict.contact.title}</h1>
          <p className="text-gray-600 mb-8">{dict.contact.description}</p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Building2 className="w-6 h-6 text-gray-400" />
              <div>
                <h3 className="font-semibold">{dict.contact.company}</h3>
                <p className="text-gray-600">{dict.contact.address}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Phone className="w-6 h-6 text-gray-400" />
              <div>
                <h3 className="font-semibold">{dict.contact.phone}</h3>
                <p className="text-gray-600">+86 123 4567 89XX</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Mail className="w-6 h-6 text-gray-400" />
              <div>
                <h3 className="font-semibold">{dict.contact.email}</h3>
                <p className="text-gray-600">diskdamper-info@dkmachineryinc.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-gray-400" />
              <div>
                <h3 className="font-semibold">{dict.contact.office}</h3>
                <p className="text-gray-600">{dict.contact.officeAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}