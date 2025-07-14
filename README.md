This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Font Usage

This project uses [Hubot Sans](https://github.com/github/hubot-sans) as its primary font family. Hubot Sans is a custom variable font created by GitHub, designed to be modern, readable, and highly versatile.

### Font Information
- **Font Name**: Hubot Sans
- **Designer**: GitHub
- **License**: [SIL Open Font License 1.1](https://github.com/github/hubot-sans/blob/main/LICENSE)
- **Source**: [GitHub Repository](https://github.com/github/hubot-sans)

### Implementation Details
- The font is locally hosted in `/public/fonts/` directory
- Implemented using `next/font/local` for optimal performance
- Features:
  - Font display: swap
  - Preloading enabled
  - System fonts fallback

### Available Weights
- ExtraLight (200)
- Light (300)
- Regular (400)
- Medium (500)
- SemiBold (600)
- Bold (700)
- ExtraBold (800)
- Black (900)

All weights are available in both normal and italic styles, as well as in Condensed and Expanded variations.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# solar damper
- 单独设置了渲染
- SolarDamperInteractive.tsx // 组件
- SolarDamperPage.tsx // 页面