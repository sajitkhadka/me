import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { BlogPost, BlogPostTag, Tag, User } from "@prisma/client"
import { Calendar, Edit2 } from "lucide-react"
import AuthorCard from "../custom-ui/author-card"
import { auth } from "@/auth"
import { Button } from "../ui/button"
import Link from "next/link"

export const Article = async ({ post, includeAuthor = true }: {
    post: BlogPost & {
        author: User
        tags: (BlogPostTag & {
            tag: Tag;
        })[];
    },
    includeAuthor?: boolean
}
) => {
    const session = await auth()
    const user = session?.user;
    return <article className="prose dark:prose-invert max-w-none">
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
            {user.role === "admin" && <div>
                <Link href={`/blog/${post.id}/edit`} className="px-2 py-1">
                    <Edit2 className="w-4 h-4" />
                </Link>
            </div>}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <hr className="my-8" />
        {includeAuthor && <AuthorCard author={post.author} />}
    </article>
}