import Image from "next/image"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import blogPostService from '@/db/blogpost.service'
import commentService from "@/db/comments.service"
import { formatDate } from "@/lib/utils"
import Comments from "./comments"
import AuthorCard from "./author-card"

interface PostPageProps {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await blogPostService.getBlogPostById(params.id)
  const initialComments = await commentService.getCommentsByBlogPostId(params.id, { limit: 5, offset: 0 })
  const totalComments = await commentService.getCommentCountByBlogPostId(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="container py-6 max-w-3xl mx-auto">
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="mb-4">{post.title}</h1>
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