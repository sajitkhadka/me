import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../../components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "../../components/custom-ui/tag";
import { Tag as TagType } from "@prisma/client";
import Reaction from "./reaction";
// import Reaction from "./reaction";

interface PostItemProps {
  slug: string;
  title: string;
  summary?: string;
  date: string;
  tags?: Array<TagType>;
  totalReactions: number;
  totalComments: number;
}

export function PostItem({
  slug,
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
              <Link href={"/blog/" + slug}>{title}</Link>
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
      <div className="flex justify-between items-center">
        <dl>
          <Reaction
            reactionsCount={totalReactions}
            commentsCount={totalComments}
            postId={slug}
            createdDate={new Date(date)}
          />
        </dl>
        <Link
          href={"/blog/" + slug}
          className={cn(buttonVariants({ variant: "link" }), "py-0")}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
