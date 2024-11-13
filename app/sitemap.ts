import blogPostService from "@/db/blogpost.service"
import { BlogPostType } from "@/db/types"
import { absoluteUrl } from "@/lib/utils"
import GithubSlugger from 'github-slugger'
import { MetadataRoute } from 'next'

const slugger = new GithubSlugger()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await blogPostService.getPublicBlogPosts()

    const blogPostUrls = posts.map(post => ({
        url: absoluteUrl(`/blog/${post.id}/${slugger.slug(post.title)}`),
        lastModified: post.updatedAt,
    }))
    const privacyPolicy = await blogPostService.getPostByType(BlogPostType.PrivacyPolicy);
    const about = await blogPostService.getPostByType(BlogPostType.About);

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
        ...blogPostUrls,
    ]
}