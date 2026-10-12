import blogPostService from "@/db/blogpost.service"
import { BlogPostType } from "@/db/types"
import { absoluteUrl, createSlug } from "@/lib/utils"
import { projects } from '@/config/projects'
import { MetadataRoute } from 'next'

// Dates for pages whose content lives in the repo. Bump when the page text changes.
const siteRefreshed = new Date("2026-10-12")

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = (await blogPostService.getPublicBlogPosts()).filter(
        post => post.typeId === BlogPostType.BlogPost,
    )

    const blogPostUrls = posts.map(post => ({
        url: absoluteUrl(`/blog/${post.id}/${createSlug(post.title)}`),
        lastModified: post.updatedAt,
    }))
    const privacyPolicy = await blogPostService.getPostByType(BlogPostType.PrivacyPolicy);

    const projectUrls = projects
        .filter(project => project.caseStudy)
        .map(project => ({ url: absoluteUrl(`/projects/${project.slug}`), lastModified: siteRefreshed }))

    const newestPost = posts.reduce<Date | undefined>(
        (newest, post) => (!newest || post.updatedAt > newest ? post.updatedAt : newest),
        undefined,
    )

    return [
        { url: absoluteUrl('/'), lastModified: siteRefreshed },
        { url: absoluteUrl('/blog'), lastModified: newestPost },
        { url: absoluteUrl('/apps'), lastModified: siteRefreshed },
        { url: absoluteUrl('/resume'), lastModified: siteRefreshed },
        { url: absoluteUrl('/now'), lastModified: siteRefreshed },
        { url: absoluteUrl('/about'), lastModified: siteRefreshed },
        { url: absoluteUrl('/privacy-policy'), lastModified: privacyPolicy?.updatedAt },
        ...projectUrls,
        ...blogPostUrls,
    ]
}
