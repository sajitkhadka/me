import { notFound } from "next/navigation";
import blogPostService from '@/db/blogpost.service';
import { Tag } from "@/components/tag";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Comments from "./comments";
import commentService from "@/db/comments.service";

interface PostPageProps {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await blogPostService.getBlogPostById(params.id);
  const initialComments = await commentService.getCommentsByBlogPostId(params.id, { limit: 5, offset: 0 });
  const totalComments = await commentService.getCommentCountByBlogPostId(params.id);
  if (!post) {
    notFound();
  }

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <h1 className="mb-2 text-3xl font-semibold">{post.title}</h1>

      <div className="flex gap-2 mb-2">
        {post.tags?.map((tag) => (
          <Tag tag={tag.tag.name} key={tag.tagId} />
        ))}
      </div>
      <hr className="my-4" />
      <dl>
        <dt className="sr-only">Published On</dt>
        <div className="text-sm sm:text-base font-normal flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.createdAt.toDateString()}>{formatDate(post.createdAt.toDateString())}</time>
        </div>
      </dl>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <hr className="my-4" />
      <Comments postId={post.id} initialComments={initialComments} totalComments={totalComments} totalReactions={post.reaction} />
    </article>
  );
}