import { Article } from "@/components/layout/article"
import blogPostService from '@/db/blogpost.service'
import commentService from "@/db/comments.service"
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation"
import Comments from "./comments"
import { absoluteUrl } from "@/lib/utils"

interface PostPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await blogPostService.getBlogPostById(parseInt(params.id))

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: post?.author?.name ? [post?.author?.name] : [],
      tags: post.tags?.map(tag => tag.tag.name),
      images: [
        {
          url: absoluteUrl(`/api/image/${post.coverImage}`),
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
      images: [absoluteUrl(`/api/image/${post.coverImage}`)],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const id = parseInt(params.id)
  const post = await blogPostService.getBlogPostById(id)
  const initialComments = await commentService.getCommentsByBlogPostId(id, { limit: 5, offset: 0 })
  const totalComments = await commentService.getCommentCountByBlogPostId(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container py-6 max-w-3xl mx-auto">
      <Article post={post} />
      <div className="mt-8">
        <Comments postId={post.id} initialComments={initialComments} totalComments={totalComments} totalReactions={post.reaction} />
      </div>
    </div>
  )
}