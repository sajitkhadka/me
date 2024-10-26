import { Badge } from "@/components/ui/badge"
import blogPostService from '@/db/blogpost.service'
import commentService from "@/db/comments.service"
import { formatDate } from "@/lib/utils"
import { Calendar } from "lucide-react"
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation"
import AuthorCard from "./author-card"
import Comments from "./comments"

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
    description: post.content.substring(0, 160), // First 160 characters as description
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: post?.author?.name ? [post?.author?.name] : [],
      tags: post.tags?.map(tag => tag.tag.name),
      images: [
        {
          url: `/api/image/${post.coverImage}`,
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
      description: post.content.substring(0, 160),
      images: [`/api/image/${post.coverImage}`],
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
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="mb-4 text-2xl">{post.title}</h1>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <time dateTime={post.createdAt.toDateString()}>{formatDate(post.createdAt.toDateString())}</time>
          </div>
          <div className="flex gap-2">
            {post.tags?.map((tag) => (
              <Badge key={tag.tagId} variant="secondary">
                {tag.tag.name}
              </Badge>
            ))}
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <hr className="my-8" />
        <AuthorCard author={post.author} />
      </article>
      <div className="mt-8">
        <Comments postId={post.id} initialComments={initialComments} totalComments={totalComments} totalReactions={post.reaction} />
      </div>
    </div>
  )
}