import { BlogPosts } from "@/db/blogpost.service";
import { PostItem } from "./post-item";
import { QueryPagination } from "@/components/query-pagination";

export default function Posts({ displayPosts, totalPages }: { displayPosts: BlogPosts, totalPages: number }) {
    return (
        <>
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                <div className="flex-1 space-y-4">
                    <h1 className="inline-block text-2xl">My Blog</h1>
                    <p className="text-lg text-muted-foreground">
                        My journey through code, creativity, and personal growth
                    </p>
                </div>
            </div>
            <div className="mt-4">
                <hr />
                {displayPosts?.length > 0 ? (
                    <ul className="flex flex-col">
                        {displayPosts.map((post) => (
                            <li key={post.id}>
                                <PostItem
                                    postId={post.id}
                                    date={post.createdAt.toISOString()}
                                    title={post.title}
                                    summary={post.summary}
                                    tags={post.tags.map(tagRelation => tagRelation.tag)}
                                    totalComments={post._count.comments}
                                    totalReactions={post.reaction}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4">I am in the process of adding the blog! I will start posting soon.</p>
                )}
                <QueryPagination
                    totalPages={totalPages}
                    className="justify-end mt-4"
                />
            </div></>
    );
}