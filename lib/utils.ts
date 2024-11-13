import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { slug } from "github-slugger";
import { Tag } from "@prisma/client";
import { Tags } from "@/db/tags.service";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function sortPosts(posts: Array<any>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

export function getAllTags(posts: Array<any>) {
  const tags: Record<string, number> = {}
  posts.forEach(post => {
    if (post.published) {
      post.tags?.forEach((tag: any) => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      })
    }
  })

  return tags;
}

export function sortTagsByCount(tags: Tags) {
  return tags.sort((a, b) => b._count.blogPostTags - a._count.blogPostTags);

}

export function absoluteUrl(path: string) {
  let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    return path;
  }
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }
  if (path.startsWith('/')) {
    path = path.slice(1);
  }
  return `${baseUrl}/${path}`;
}
