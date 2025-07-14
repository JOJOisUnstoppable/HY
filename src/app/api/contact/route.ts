import { Client } from '@notionhq/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, phone, message, lang } = body

    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      console.error('环境变量未设置')
      throw new Error('服务器配置错误')
    }

    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    })

    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID!,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name
              }
            }
          ]
        },
        Email: {
          email: email
        },
        Company: {
          rich_text: company ? [
            {
              text: {
                content: company
              }
            }
          ] : []
        },
        Phone: {
          phone_number: phone || null  // 关键修改：空字符串转为 null
        },
        Message: {
          rich_text: [
            {
              text: {
                content: message
              }
            }
          ]
        },
        Status: {
          status: {
            name: '未跟进',
          },
        },
        Language: {
          select: {
            name: lang
          }
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    // 详细的错误日志
    console.error('Notion API 错误:', {
      error,
      message: error instanceof Error ? error.message : '未知错误',
      stack: error instanceof Error ? error.stack : undefined
    })

    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to submit form',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}