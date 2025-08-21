import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypePrism from 'rehype-prism-plus'

export function PrivacyContent() {
  const privacyContent = `
# Privacy Policy

  Updated on 2025-04-25

## 1.Introduction

This Privacy Policy describes how we collect, use, and handle your personal information when you use our services. We take your privacy seriously and are committed to protecting your personal data.

## 2.Information We Collect

We collect information that you provide directly to us, including:

- Contact information (name, email address, phone number)
- Account credentials
- Payment information
- Communication preferences

## 3.How We Use Your Information

We use the collected information for various purposes:

- Providing and maintaining our services
- Processing your transactions
- Sending you updates and marketing communications
- Improving our services
- Complying with legal obligations

## 4.Information Sharing

We do not sell your personal information. We may share your information with:

- Service providers who assist in our operations
- Legal authorities when required by law
- Business partners with your consent

## 5.Data Security

We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.

## 6.Your Rights

You have the right to:

- Access your personal information
- Correct inaccurate data
- Request deletion of your data
- Object to data processing
- Data portability

## 7.Cookies Policy

We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences.

## 8.Changes to This Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.

## 9.Contact Us

If you have any questions about this Privacy Policy, please contact us at:

- Email: diskdamper-info@dkmachineryinc.com
- Address: Ningbo, China
- Phone: +86 780 2167
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
        {privacyContent}
      </Markdown>
    </div>
  )
}