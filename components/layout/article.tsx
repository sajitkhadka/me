import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { BlogPost, BlogPostTag, Tag, User } from "@prisma/client"
import { Calendar, Clock, Edit2 } from "lucide-react"
import AuthorCard from "../custom-ui/author-card"
import { auth } from "@/auth"
import Link from "next/link"

const readingMinutes = (html: string) =>
    Math.max(1, Math.round(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 220))

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
    const edited = post.updatedAt.getTime() - post.createdAt.getTime() > 24 * 60 * 60 * 1000
    return <article className="prose max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-primary prose-a:underline-offset-4 prose-code:font-mono prose-pre:border prose-pre:bg-card">
        <header className="not-prose mb-10 space-y-5 border-b pb-8">
            {!post.published && (
                <p className="inline-block rounded-md border border-amber-500/50 bg-amber-500/10 px-2 py-1 font-mono text-xs text-amber-600 dark:text-amber-400">
                    draft: only you can see this
                </p>
            )}
            <h1 className="text-3xl font-bold leading-tight text-balance sm:text-4xl">{post.title}</h1>
            {post.summary && <p className="text-lg text-muted-foreground">{post.summary}</p>}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt.getTime())}</time>
                </span>
                {edited && (
                    <span>
                        updated <time dateTime={post.updatedAt.toISOString()}>{formatDate(post.updatedAt.getTime())}</time>
                    </span>
                )}
                <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" /> {readingMinutes(post.content)} min read
                </span>
                {user?.role === "admin" && (
                    <Link href={`/blog/${post.id}/edit`} className="flex items-center gap-1.5 hover:text-foreground" aria-label="Edit post">
                        <Edit2 className="h-3.5 w-3.5" /> edit
                    </Link>
                )}
            </div>
            {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                        <Badge key={tag.tagId} variant="secondary" className="font-mono font-normal">
                            {tag.tag.name}
                        </Badge>
                    ))}
                </div>
            )}
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <hr className="my-8" />
        {includeAuthor && <AuthorCard />}
    </article>
}
