import Link from "next/link";
import { badgeVariants } from "../ui/badge";
import { absoluteUrl, createSlug } from "@/lib/utils";

interface TagProps {
  tag: string;
  current?: boolean;
  count?: number;
}
export function Tag({ tag, current, count }: TagProps) {
  return (
    <Link
      className={badgeVariants({
        variant: current ? "default" : "secondary",
        className: "no-underline rounded-md",
      })}
      href={absoluteUrl(`/tags/${createSlug(tag)}`)}
    >
      {tag} {count ? `(${count})` : null}
    </Link>
  );
}
