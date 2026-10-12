import { BlogPostType } from "@/db/types";
import prisma from "@/lib/prisma";
import { siteConfig } from "@/config/site";
import { createSlug } from "@/lib/utils";

export const siteOrigin = () => (process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url).replace(/\/$/, "");

export const postPath = (post: { id: number; title: string }) => `/blog/${post.id}/${createSlug(post.title)}`;

/** Published blog posts only (not the privacy policy or About), newest first. */
export function getPublishedPosts(limit?: number) {
  return prisma.blogPost.findMany({
    where: { published: true, typeId: BlogPostType.BlogPost },
    include: { tags: { include: { tag: true } } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/** Post HTML to readable plain text, keeping paragraph, heading and code breaks. */
export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_m, code: string) => "\n```\n" + code.replace(/<[^>]+>/g, "") + "\n```\n")
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_m, n: string, t: string) => `\n${"#".repeat(Number(n))} ${t.replace(/<[^>]+>/g, "")}\n`)
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/(p|div|ul|ol|blockquote|tr)>|<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** JSON for an inline ld+json script. Escaping "<" keeps a title such as "</script>" from closing the tag. */
export const jsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
