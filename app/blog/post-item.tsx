import Link from "next/link";
import { createSlug } from "@/lib/utils";
import { Tag } from "../../components/custom-ui/tag";
import { Tag as TagType } from "@prisma/client";
import Reaction from "./reaction";

interface PostItemProps {
  postId: number;
  title: string;
  summary?: string;
  date: string;
  tags?: Array<TagType>;
  totalReactions: number;
  totalComments: number;
}

export function PostItem({
  postId,
  title,
  summary,
  date,
  tags,
  totalComments,
  totalReactions
}: PostItemProps) {
  const href = `/blog/${postId}/${createSlug(title)}`;
  return (
    <article className="surface surface-hover group relative flex flex-col gap-3 p-5 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-background">
      <h2 className="text-lg font-semibold leading-snug tracking-tight sm:text-xl">
        {/* The stretched link makes the whole card clickable; tags sit above it. */}
        <Link
          href={href}
          className="after:absolute after:inset-0 after:content-[''] group-hover:text-primary group-focus-within:text-primary focus-visible:outline-none"
        >
          {title}
        </Link>
      </h2>
      {summary && <p className="line-clamp-3 text-sm text-muted-foreground sm:text-base">{summary}</p>}
      {tags && tags.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag tag={tag.name} key={tag.id} />
          ))}
        </div>
      )}
      <div className="border-t pt-3">
        <Reaction
          reactionsCount={totalReactions}
          commentsCount={totalComments}
          postId={postId}
          createdDate={new Date(date)}
        />
      </div>
    </article>
  );
}
