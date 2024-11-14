import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../../components/ui/button";
import { absoluteUrl, cn, createSlug, formatDate } from "@/lib/utils";
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
  return (
    <article className="flex flex-col gap-2 border-border border-b py-3">
      <div className="flex justify-between flex-col sm:flex-row gap-4">
        <div>
          <div>
            <h2 className="text-xl font-medium">
              <Link href={absoluteUrl("/blog/" + postId) + "/" + createSlug(title)}>{title}</Link>
            </h2>
          </div>
          <div className="flex gap-2 mt-3">
            {tags?.map((tag) => (
              <Tag tag={tag.name} key={tag.id} />
            ))}
          </div>
        </div>

      </div>
      <div className="max-w-none text-muted-foreground">{summary}</div>
      <div className="flex flex-col justify-start sm:justify-between sm:items-center  sm:flex-row">
        <dl>
          <Reaction
            reactionsCount={totalReactions}
            commentsCount={totalComments}
            postId={postId}
            createdDate={new Date(date)}
          />
        </dl>
        <Link
          href={(absoluteUrl("/blog/" + postId) + "/" + createSlug(title))}
          className={cn(buttonVariants({ variant: "link" }), "py-0 justify-start")}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
