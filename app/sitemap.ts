import blogPostService from "@/db/blogpost.service"
import { BlogPostType } from "@/db/types"
import { absoluteUrl, createSlug } from "@/lib/utils"
import { projects } from '@/config/projects'
import { MetadataRoute } from 'next'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await blogPostService.getPublicBlogPosts()

    const blogPostUrls = posts.map(post => ({
        url: absoluteUrl(`/blog/${post.id}/${createSlug(post.title)}`),
        lastModified: post.updatedAt,
    }))
    const privacyPolicy = await blogPostService.getPostByType(BlogPostType.PrivacyPolicy);
    const about = await blogPostService.getPostByType(BlogPostType.About);

    const projectUrls = projects
        .filter(project => project.caseStudy)
        .map(project => ({ url: absoluteUrl(`/projects/${project.slug}`) }))

    return [
        {
            url: absoluteUrl('/'),
            lastModified: new Date("2024-10-11"),
        },
        {
            url: absoluteUrl('/blog'),
            lastModified: new Date("2024-10-11"),
        },
        {
            url: absoluteUrl('/privacy-policy'),
            lastModified: privacyPolicy?.updatedAt,
        },
        {
            url: absoluteUrl('/about'),
            lastModified: about?.updatedAt,
        },
        { url: absoluteUrl('/apps') },
        { url: absoluteUrl('/now') },
        ...projectUrls,
        ...blogPostUrls,
    ]
}