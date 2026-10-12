import { Article } from "@/components/layout/article"
import blogPostService from '@/db/blogpost.service'
import commentService from "@/db/comments.service"
import { Metadata, ResolvingMetadata } from 'next'
import { notFound, permanentRedirect } from "next/navigation"
import Comments from "./comments"
import { absoluteUrl, createSlug } from "@/lib/utils"
import { ogImage } from "@/config/site"
import { htmlToText, jsonLdString, siteOrigin } from "@/lib/seo"

interface PostPageProps {
  params: Promise<{
    id: string
    slug?: string
  }>
}

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await blogPostService.getBlogPostById(parseInt((await params).id))

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const previousImages = (await parent).openGraph?.images || []
  const image = post.coverImage
    ? absoluteUrl(`/api/image/${post.coverImage}`)
    : ogImage(post.title, 'blog')

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.id}/${createSlug(post.title)}` },
    // A draft is visible to its author only; keep it out of search even if the URL leaks.
    ...(post.published ? {} : { robots: { index: false, follow: false } }),
    keywords: post.tags?.map(tag => tag.tag.name),
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      authors: post?.author?.name ? [post?.author?.name] : [],
      tags: post.tags?.map(tag => tag.tag.name),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [image],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { id: rawId, slug } = await params
  const id = parseInt(rawId)
  const post = await blogPostService.getBlogPostById(id)
  const initialComments = await commentService.getCommentsByBlogPostId(id, { limit: 5, offset: 0 })
  const totalComments = await commentService.getCommentCountByBlogPostId(id)

  if (!post) {
    notFound()
  }

  // One address per post: /blog/5 and a stale slug after a rename both land on the canonical URL.
  const canonicalSlug = createSlug(post.title)
  if (canonicalSlug && slug !== canonicalSlug) {
    permanentRedirect(`/blog/${post.id}/${canonicalSlug}`)
  }

  const origin = siteOrigin()
  const url = `${origin}/blog/${post.id}/${canonicalSlug}`
  const image = post.coverImage ? `${origin}/api/image/${post.coverImage}` : `${origin}${ogImage(post.title, 'blog')}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.summary,
        image,
        datePublished: post.createdAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        inLanguage: 'en',
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        author: { '@id': `${origin}/#person` },
        publisher: { '@id': `${origin}/#person` },
        isPartOf: { '@id': `${origin}/#website` },
        keywords: post.tags.map(t => t.tag.name).join(', '),
        wordCount: htmlToText(post.content).split(/\s+/).filter(Boolean).length,
        commentCount: totalComments,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${origin}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  }

  return (
    <div className="container py-10 max-w-3xl mx-auto px-4 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <Article post={post} />
      <div className="mt-8">
        <Comments postId={post.id} initialComments={initialComments} totalComments={totalComments} totalReactions={post.reaction} />
      </div>
    </div>
  )
}
