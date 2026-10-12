import { BlogPosts } from "@/db/blogpost.service";
import { PostItem } from "./post-item";
import { QueryPagination } from "@/components/query-pagination";

export default function Posts({ displayPosts, totalPages }: { displayPosts: BlogPosts, totalPages: number }) {
    return (
        <>
            <div className="mt-4">
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