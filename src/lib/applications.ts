import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import type { ApplicationData, Application } from '@/types/application';
import type { Locale } from './i18n/config';
import { getBlogPosts } from './blog'

// 读取所有应用数据
export const getApplicationData = cache(async (locale: Locale): Promise<ApplicationData> => {
    try {
        const applicationsDir = path.join(process.cwd(), 'content', 'applications', locale);
        const files = fs.readdirSync(applicationsDir);
        
        const applications: Application[] = [];
        
        for (const file of files) {
            if (file.endsWith('.md') && file !== 'applications.md') {
                const filePath = path.join(applicationsDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const { data, content } = matter(fileContent);
                
                const id = path.basename(file, '.md');
                
                // 确保所有必需属性都存在
                const app: Application = {
                    id,
                    content: content.trim(),
                    title: data.title || '',
                    description: data.description || '',
                    solution: data.solution || '',
                    relatedTags: data.relatedTags || [],
                    order: data.order || 0,
                };
                
                applications.push(app);
            }
        }
        
        applications.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        return {
            applications,
            content: ''
        };
    } catch (error) {
        console.error(`Error loading application data for locale ${locale}:`, error);
        return {
            applications: [],
            content: ''
        };
    }
});

// 通过 ID 获取单个应用
export const getApplication = cache(async (locale: Locale, id: string): Promise<Application | null> => {
    try {
        const filePath = path.join(process.cwd(), 'content', 'applications', locale, `${id}.md`);
        
        if (!fs.existsSync(filePath)) {
            return null;
        }
        
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        
        // 确保所有必需属性都存在
        return {
            id,
            content: content.trim(),
            title: data.title || '',
            description: data.description || '',
            solution: data.solution || '',
            relatedTags: data.relatedTags || [],
            order: data.order || 0,
        };
    } catch (error) {
        console.error(`Error loading application ${id} for locale ${locale}:`, error);
        return null;
    }
});

// 获取所有可用的应用 ID
export const getAllApplicationIds = cache(async (locale: Locale): Promise<string[]> => {
    try {
        const applicationsDir = path.join(process.cwd(), 'content', 'applications', locale);
        const files = fs.readdirSync(applicationsDir);
        
        return files
            .filter(file => file.endsWith('.md') && file !== 'applications.md')
            .map(file => path.basename(file, '.md'));
    } catch (error) {
        console.error(`Error loading application IDs for locale ${locale}:`, error);
        return [];
    }
});

// 获取所有语言的所有应用 ID
export const getAllApplicationParams = cache(async (): Promise<{ locale: Locale; id: string }[]> => {
    const locales: Locale[] = ['zh', 'en', 'es', 'de'];
    const allParams: { locale: Locale; id: string }[] = [];
    
    for (const locale of locales) {
        const ids = await getAllApplicationIds(locale);
        ids.forEach(id => allParams.push({ locale, id }));
    }
    
    return allParams;
});

// 获取所有应用详情
// export const getApplicationData = cache(async (locale: Locale): Promise<ApplicationData> => {
//   try {
//     // 读取对应语言的 applications.md 文件
//     const filePath = path.join(process.cwd(), 'content', 'applications', locale, 'applications.md')
//     const fileContent = fs.readFileSync(filePath, 'utf8')
    
//     // 使用 gray-matter 解析 frontmatter 和内容
//     const { data, content } = matter(fileContent)
    
//     // 确保 applications 数组存在并按 order 排序
//     const applications = (data.applications || []) as Application[]
//     applications.sort((a, b) => a.order - b.order)

//     return {
//       applications,
//       content: content.trim()
//     }
//   } catch (error) {
//     console.error(`Error loading application data for locale ${locale}:`, error)
//     // 返回空数据而不是抛出错误，以避免整个页面崩溃
//     return {
//       applications: [],
//       content: ''
//     }
//   }
// })

// 获取单个应用详情
// export const getApplication = cache(async (locale: Locale, id: string): Promise<Application | null> => {
//   try {
//     const { applications } = await getApplicationData(locale)
//     return applications.find(app => app.id === id) || null
//   } catch (error) {
//     console.error(`Error loading application ${id} for locale ${locale}:`, error)
//     return null
//   }
// })

// 获取与应用相关标签关联的所有博客文章
export const getApplicationRelatedPosts = cache(async (
  locale: Locale,
  applicationId: string
): Promise<Array<{ slug: string; title: string; date: string; coverImage?: string }>> => {
  try {
    const application = await getApplication(locale, applicationId)
    if (!application) return []

    const posts = await getBlogPosts(locale)
    
    return posts
      .filter(post => 
        post.tags.some(tag => application.relatedTags.includes(tag))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(post => ({
        slug: post.slug,
        title: post.title,
        date: post.date,
        coverImage: post.coverImage
      }))
  } catch (error) {
    console.error(`Error loading related posts for application ${applicationId}:`, error)
    return []
  }
})

// 获取与应用相关标签关联的最新5篇博客文章
export const getApplicationLatestRelatedPosts = cache(async (
  locale: Locale,
  applicationId: string,
  limit: number = 5
): Promise<Array<{ slug: string; title: string; date: string; coverImage?: string }>> => {
  try {
    const allRelatedPosts = await getApplicationRelatedPosts(locale, applicationId)
    return allRelatedPosts.slice(0, limit)
  } catch (error) {
    console.error(`Error loading latest related posts for application ${applicationId}:`, error)
    return []
  }
})