'use client'

import { useState, useCallback } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'


// 添加字典类型定义
interface ContactFormDictionary {
  contact: {
    form: {
      name: string
      email: string
      company: string
      phone: string
      message: string
      placeholder: {
        name: string
        email: string
        company: string
        phone: string
        message: string
      }
      submit: string
      submitting: string
      validation: {
        name: {
          required: string
          min: string
          max: string
          invalid: string
        }
        email: {
          required: string
          invalid: string
          tempEmail: string
        }
        company: {
          length: string
          invalid: string
        }
        phone: {
          invalid: string
        }
        message: {
          min: string
          max: string
          sensitive: string
        }
      }
    }
    success: {
      title: string
      message: string
    }
    error: {
      title: string
      message: string
      tooFrequent: {
        title: string
        description: string
      }
    }
  }
}

// 将静态值提取到组件外部
const NAME_REGEX = /^[a-zA-Z\u4e00-\u9fa5\u0900-\u097F\u0400-\u04FF\u0370-\u03FF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF\u0080-\u024F\s.·'-]+$/
const COMPANY_REGEX = /^[a-zA-Z0-9\u4e00-\u9fa5\s()（）.,、。，]+$/
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PHONE_REGEX = /^(?:(?:\+|00)[1-9]\d{0,3}[\s.-]?)?\d{4,14}(?:[\s.-]?\d{2,4})?$/
const TEMP_EMAIL_DOMAINS = ['tempmail.com', 'temp-mail.org', '10minutemail.com']
const SENSITIVE_WORDS = ['spam', 'test', 'xxx']

// 添加 XSS 防护相关的工具函数
const sanitizeInput = (value: string): string => {
  return value
    .replace(/[<>]/g, '') // 移除 < 和 > 标签
    .replace(/javascript:/gi, '') // 移除 javascript: 协议
    .replace(/on\w+=/gi, '') // 移除 onclick= 等事件处理程序
    .replace(/data:/gi, '') // 移除 data: 协议
    .trim()
}


// 添加请求频率限制相关的常量
const SUBMIT_COOLDOWN = 60000 // 提交冷却时间：60秒
const ERROR_COOLDOWN = 3000   // 错误冷却时间：3秒

export function ContactForm({ dict, lang }: { dict: ContactFormDictionary, lang: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)
  // const [submitCount, setSubmitCount] = useState(0)

  // 检查是否可以提交
  const canSubmit = useCallback(() => {
    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime
    
    // 如果是首次提交，直接允许
    if (lastSubmitTime === 0) return true
    
    // 如果在冷却时间内
    if (timeSinceLastSubmit < SUBMIT_COOLDOWN) {
      const remainingTime = Math.ceil((SUBMIT_COOLDOWN - timeSinceLastSubmit) / 1000)
      toast.error(dict.contact.error.tooFrequent.title, {
        description: dict.contact.error.tooFrequent.description.replace('{seconds}', remainingTime.toString()),
      })
      return false
    }
    
    return true
  }, [lastSubmitTime, dict.contact.error.tooFrequent])

  const formSchema = z.object({
    name: z.string()
      .min(2, dict.contact.form.validation.name.min)
      .max(50, dict.contact.form.validation.name.max)
      .transform(sanitizeInput)
      .refine((value) => {
        return NAME_REGEX.test(value)
      }, {
        message: dict.contact.form.validation.name.invalid
      }),
    email: z.string()
      .email(dict.contact.form.validation.email.invalid)
      .transform(sanitizeInput)
      .refine((value) => {
        return EMAIL_REGEX.test(value)
      }, {
        message: dict.contact.form.validation.email.invalid
      })
      .refine((value) => {
        // 检查常见的临时邮箱域名
        // const tempEmailDomains = ['tempmail.com', 'temp-mail.org', '10minutemail.com']
        const domain = value.split('@')[1]
        return !TEMP_EMAIL_DOMAINS.includes(domain)
      }, {
        message: dict.contact.form.validation.email.tempEmail
      }),
    company: z.string()
      .optional()
      .transform((value) => value ? sanitizeInput(value) : value)
      .refine((value) => {
        if (!value) return true
        return value.length >= 2 && value.length <= 100
      }, {
        message: dict.contact.form.validation.company.length
      })
      .refine((value) => {
        if (!value) return true // 如果是空值则跳过验证
        // 检查是否包含特殊字符
        // const companyRegex = /^[a-zA-Z0-9\u4e00-\u9fa5\s()（）.,、。，]+$/
        return COMPANY_REGEX.test(value)
      }, {
        message: dict.contact.form.validation.company.invalid
      }),
    phone: z.string()
      .optional()
      .transform((value) => value ? sanitizeInput(value) : value)
      .refine((value) => {
        if (!value) return true // 如果是空值则跳过验证
        // 支持多种国际电话号码格式：
        // 1. 国际格式：+国家代码 号码
        // 2. 中国大陆：+86/0086/086 手机号/座机号
        // 3. 香港：+852 8位数字
        // 4. 台湾：+886 9位数字
        // 5. 日本：+81 10位数字
        // 6. 韩国：+82 10位数字
        // 7. 美国/加拿大：+1 10位数字
        // 8. 欧洲：变长，最多15位
        // const phoneRegex = /^(?:(?:\+|00)[1-9]\d{0,3}[\s.-]?)?\d{4,14}(?:[\s.-]?\d{2,4})?$/
        return PHONE_REGEX.test(value)
      }, {
        message: dict.contact.form.validation.phone.invalid
      }),
    message: z.string()
      .min(10, dict.contact.form.validation.message.min)
      .max(1000, dict.contact.form.validation.message.max)
      .transform(sanitizeInput)
      .refine((value) => {
        return !SENSITIVE_WORDS.some(word => value.toLowerCase().includes(word))
      }, {
        message: dict.contact.form.validation.message.sensitive
      }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // 检查提交频率
    if (!canSubmit()) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, lang }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '提交失败')
      }

      // 更新最后提交时间
      setLastSubmitTime(Date.now())
      // setSubmitCount(prev => prev + 1)
      
      // 显示成功动画
      setShowSuccess(true)
      toast.success(dict.contact.success.title, {
        description: dict.contact.success.message,
      })
      form.reset()
      
      // 3秒后隐藏成功动画
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    } catch (error) {
      // 错误处理时也需要添加短暂冷却
      setTimeout(() => {
        setIsSubmitting(false)
      }, ERROR_COOLDOWN)
      
      toast.error(dict.contact.error.title, {
        description: error instanceof Error 
          ? error.message 
          : dict.contact.error.message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            aria-describedby="success-message"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center"
                  role="img"
                  aria-label="Submitted Succeeded"
                >
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h3 
                  id="success-title"
                  className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  {dict.contact.success.title}
                </h3>
                <p 
                  id="success-message"
                  className="mt-2 text-gray-600 dark:text-gray-300"
                >
                  {dict.contact.success.message}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6"
          aria-label="Contact Form"
          role="form"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.contact.form.name}</FormLabel>
                <FormControl>
                  <Input 
                    className="placeholder:text-muted-foreground/50" 
                    placeholder={dict.contact.form.placeholder.name} 
                    {...field} 
                    aria-required="true"
                    aria-invalid={form.formState.errors.name ? "true" : "false"}
                    aria-describedby={form.formState.errors.name ? "name-error" : undefined}
                  />
                </FormControl>
                <FormMessage id="name-error" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.contact.form.email}</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    className="placeholder:text-muted-foreground/50"
                    placeholder={dict.contact.form.placeholder.email}
                    {...field} 
                    aria-required="true"
                    aria-invalid={form.formState.errors.email ? "true" : "false"}
                    aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                  />
                </FormControl>
                <FormMessage id="email-error" />
              </FormItem>
            )}
          />
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            role="group"
            aria-label="Additional Information"
          >
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.contact.form.company}</FormLabel>
                  <FormControl>
                    <Input 
                      className="placeholder:text-muted-foreground/50"
                      placeholder={dict.contact.form.placeholder.company}
                      {...field} 
                      aria-invalid={form.formState.errors.company ? "true" : "false"}
                      aria-describedby={form.formState.errors.company ? "company-error" : undefined}
                    />
                  </FormControl>
                  <FormMessage id="company-error" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dict.contact.form.phone}</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      className="placeholder:text-muted-foreground/50"
                      placeholder={dict.contact.form.placeholder.phone}
                      {...field} 
                      aria-invalid={form.formState.errors.phone ? "true" : "false"}
                      aria-describedby={form.formState.errors.phone ? "phone-error" : undefined}
                    />
                  </FormControl>
                  <FormMessage id="phone-error" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.contact.form.message}</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={5} 
                    className="placeholder:text-muted-foreground/50"
                    placeholder={dict.contact.form.placeholder.message}
                    {...field} 
                    aria-required="true"
                    aria-invalid={form.formState.errors.message ? "true" : "false"}
                    aria-describedby={form.formState.errors.message ? "message-error" : undefined}
                  />
                </FormControl>
                <FormMessage id="message-error" />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 
                  className="mr-2 h-4 w-4 animate-spin" 
                  aria-hidden="true"
                />
                {dict.contact.form.submitting}
              </>
            ) : (
              dict.contact.form.submit
            )}
          </Button>
        </form>
      </Form>
    </>
  )
}