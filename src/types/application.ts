export interface Application {
  id: string
  title: string
  description: string
  solution: string
  relatedTags: string[]
  order: number
  content: string // 应用详情内容正文
}

export interface ApplicationData {
  applications: Application[]
  content: string
}