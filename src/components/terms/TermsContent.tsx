import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypePrism from 'rehype-prism-plus'

export function TermsContent() {
  const termsContent = `
# Terms of Use

Updated on 2025-04-25

## 1.Agreement to Terms

By accessing and using our services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our services.

## 2.Description of Service

Our service provides gas spring solutions and related products. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.

## 3.User Responsibilities

Users of our service agree to:
- Provide accurate and complete information
- Maintain the security of their account
- Comply with all applicable laws and regulations
- Not engage in any unauthorized use of the service

## 4.Intellectual Property Rights

All content, trademarks, and intellectual property on our service are owned by us or our licensors. Users may not:
- Copy or reproduce any content without permission
- Use our trademarks without authorization
- Modify or create derivative works

## 5.Privacy and Data Protection

We collect and process personal data as described in our Privacy Policy. By using our service, you consent to such processing and warrant that all data provided by you is accurate.

## 6.Limitation of Liability

To the fullest extent permitted by law:
- We shall not be liable for any indirect or consequential damages
- Our total liability shall not exceed the amount paid by you for the products
- We make no warranties about the accuracy of our content

## 7.Product Information

- All product specifications are subject to change without notice
- Colors and dimensions shown may vary slightly from actual products
- Prices are subject to change without prior notice

## 8.Ordering and Payment

- All orders are subject to acceptance and availability
- Prices are in displayed currency and exclude applicable taxes
- Payment must be made in full before order processing

## 9.Shipping and Delivery

- Delivery times are estimates only
- Risk passes to buyer upon delivery
- Additional charges may apply for special shipping requirements

## 10.Returns and Refunds

- Returns must be authorized within 30 days of receipt
- Products must be unused and in original packaging
- Refunds will be processed within 14 business days

## 11.Warranty

- Products are covered by manufacturer's warranty
- Warranty claims must follow specified procedures
- Some conditions and exclusions apply

## 12.Termination

We reserve the right to:
- Terminate or suspend access without prior notice
- Remove or edit content
- Take legal action if necessary

## 13.Governing Law

These terms shall be governed by and construed in accordance with local laws, without regard to its conflict of law provisions.

## 14.Changes to Terms

We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.

## 15.Contact Information

For questions about these Terms of Use, please contact us at:
- Email: dk-gasspring@mindrose.xyz (email from dev team)
- Address: Ningbo, China
- Phone: +86 123 4567 89XX
`

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeKatex, rehypePrism]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
          h2: ({ children, ...props }) => {
            // 从内容中提取标题编号
            const titleText = children?.toString() || ''
            const id = titleText.split('.')[0]
            return <h2 id={`${id}-${titleText.split('.')[1]?.toLowerCase().replace(/\s+/g, '-')}`} className="text-2xl font-bold mt-6 mb-3" {...props}>{children}</h2>
          },
          h3: ({ children }) => <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>,
          // 自定义链接样式
          a: ({ href, children }) => (
            <a href={href} className="text-blue-600 hover:text-blue-800 transition-colors" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          // 自定义列表样式
          ul: ({ children, ...props }) => {
            const depth = props.node?.position?.start?.line || 0;
            return (
              <ul className={`list-disc my-6 ${depth > 1 ? 'ml-6 mt-2 mb-2' : 'list-inside'}`} {...props}>
                {children}
              </ul>
            );
          },
          // 添加段落样式
          p: ({ children }) => (
            <p className="my-4 leading-7">
              {children}
            </p>
          ),
          // 添加块引用样式
          blockquote: ({ children }) => (
            <blockquote className="pl-4 border-l-4 border-gray-200 my-6 italic">
              <div className="text-gray-700 dark:text-gray-300">
                {children}
              </div>
            </blockquote>
          )
        }}
      >
        {termsContent}
      </Markdown>
    </div>
  )
}