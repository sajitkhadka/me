import { z } from "zod";
import prisma from "@/lib/prisma";
import { BlogPostType } from "@/db/types";
import { createSlug } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { markdownToHtml, summarize } from "./markdown";
import type { McpPrincipal } from "./tokens";

export type ToolResult = { content: { type: "text"; text: string }[]; isError?: boolean };
const text = (value: unknown): ToolResult => ({
  content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }],
});
const fail = (message: string): ToolResult => ({ ...text(message), isError: true });

const tagList = z.array(z.string().trim().min(1).max(30)).max(8);

const schemas = {
  list_posts: z.object({
    status: z.enum(["all", "published", "draft"]).default("all"),
    limit: z.number().int().min(1).max(50).default(20),
  }),
  get_post: z.object({ id: z.number().int().positive() }),
  create_post: z.object({
    title: z.string().trim().min(3).max(150),
    content_markdown: z.string().min(1).max(100_000),
    summary: z.string().trim().max(300).optional(),
    tags: tagList.default([]),
    published: z.boolean().default(false),
  }),
  update_post: z.object({
    id: z.number().int().positive(),
    title: z.string().trim().min(3).max(150).optional(),
    content_markdown: z.string().min(1).max(100_000).optional(),
    summary: z.string().trim().max(300).optional(),
    tags: tagList.optional(),
    published: z.boolean().optional(),
  }),
  list_tags: z.object({}),
} as const;

export const toolDefinitions = [
  {
    name: "list_posts",
    description: "List posts of every type and author (newest first), drafts included unless filtered. Returns id, title, type, status, tags and URL.",
    inputSchema: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["all", "published", "draft"], default: "all" },
        limit: { type: "integer", minimum: 1, maximum: 50, default: 20 },
      },
    },
  },
  {
    name: "get_post",
    description: "Read one blog post by id, including its body as HTML.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "integer" } },
      required: ["id"],
    },
  },
  {
    name: "create_post",
    description:
      "Create a blog post from Markdown. It is saved as a DRAFT unless published is true, so ask before publishing. " +
      "The title is rendered as the page heading, so start body headings at ## . Code fences are supported. " +
      "Write a summary of one or two sentences: it is the meta description that search engines and AI tools quote.",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Specific, 3-150 characters." },
        content_markdown: { type: "string", description: "Post body in Markdown. Raw HTML is escaped." },
        summary: { type: "string", description: "Up to 300 characters. Defaults to the first paragraph." },
        tags: { type: "array", items: { type: "string" }, description: "Up to 8 short tags, e.g. kubernetes." },
        published: { type: "boolean", default: false },
      },
      required: ["title", "content_markdown"],
    },
  },
  {
    name: "update_post",
    description:
      "Change a post. Only the fields you pass change; tags, when passed, replace the old set. " +
      "Set published to true to publish or false to move it back to draft.",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "integer" },
        title: { type: "string" },
        content_markdown: { type: "string" },
        summary: { type: "string" },
        tags: { type: "array", items: { type: "string" } },
        published: { type: "boolean" },
      },
      required: ["id"],
    },
  },
  {
    name: "list_tags",
    description:
      "List existing tags with how many posts use each, so new posts reuse them instead of inventing near-duplicates.",
    inputSchema: { type: "object", properties: {} },
  },
];

const postUrl = (post: { id: number; title: string }) =>
  `${process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url}/blog/${post.id}/${createSlug(post.title)}`;

type PostRow = { id: number; title: string; typeId: number; published: boolean; updatedAt: Date; tags: { tag: { name: string } }[] };

const summaryOf = (post: PostRow) => ({
  id: post.id,
  title: post.title,
  type: BlogPostType[post.typeId]?.replace(/^./, (c) => c.toLowerCase()) ?? post.typeId,
  status: post.published ? "published" : "draft",
  tags: post.tags.map((t) => t.tag.name),
  updatedAt: post.updatedAt.toISOString(),
  url: postUrl(post),
});

const tagWrites = (tags: string[]) =>
  tags.map((name) => ({ tag: { connectOrCreate: { where: { name }, create: { name } } } }));

/** Writes reach posts the caller authored, of any type: the privacy policy and About page are the admin's own content. */
const owned = (principal: McpPrincipal, id: number) => ({ id, authorId: principal.userId });

/** Tokens are admin-only, so reads see every post of every type and author. */
const readable = (id?: number) => (id === undefined ? {} : { id });

/** Returns null for a tool name this server does not have. */
export async function callTool(principal: McpPrincipal, name: string, rawArgs: unknown): Promise<ToolResult | null> {
  if (!(name in schemas)) return null;
  const parsed = schemas[name as keyof typeof schemas].safeParse(rawArgs ?? {});
  if (!parsed.success) {
    return fail(
      "Invalid arguments: " + parsed.error.issues.map((i) => `${i.path.join(".") || "input"}: ${i.message}`).join("; "),
    );
  }
  const args = parsed.data as any;

  switch (name) {
    case "list_posts": {
      const posts = await prisma.blogPost.findMany({
        where: {
          ...(args.status === "all" ? {} : { published: args.status === "published" }),
        },
        include: { tags: { include: { tag: true } } },
        orderBy: { createdAt: "desc" },
        take: args.limit,
      });
      return text(posts.map(summaryOf));
    }
    case "get_post": {
      const post = await prisma.blogPost.findFirst({
        where: readable(args.id),
        include: { tags: { include: { tag: true } } },
      });
      if (!post) return fail(`No post with id ${args.id}.`);
      return text({ ...summaryOf(post), summary: post.summary, version: post.version, contentHtml: post.content });
    }
    case "create_post": {
      const post = await prisma.blogPost.create({
        data: {
          authorId: principal.userId,
          typeId: BlogPostType.BlogPost,
          title: args.title,
          summary: args.summary ?? summarize(args.content_markdown),
          content: markdownToHtml(args.content_markdown),
          published: args.published,
          tags: { create: tagWrites(args.tags) },
        },
        include: { tags: { include: { tag: true } } },
      });
      return text({
        ...summaryOf(post),
        note: post.published ? "Published." : "Saved as a draft. Review it in the editor, then publish.",
      });
    }
    case "update_post": {
      const existing = await prisma.blogPost.findFirst({ where: owned(principal, args.id), select: { id: true } });
      if (!existing) return fail(`No post with id ${args.id}.`);
      const post = await prisma.$transaction(async (tx) => {
        if (args.tags) await tx.blogPostTag.deleteMany({ where: { blogPostId: args.id } });
        return tx.blogPost.update({
          where: { id: args.id },
          data: {
            version: { increment: 1 },
            ...(args.title !== undefined && { title: args.title }),
            ...(args.content_markdown !== undefined && {
              content: markdownToHtml(args.content_markdown),
              // Keep the summary in step with a rewritten body unless the caller set one.
              summary: args.summary ?? summarize(args.content_markdown),
            }),
            ...(args.content_markdown === undefined && args.summary !== undefined && { summary: args.summary }),
            ...(args.published !== undefined && { published: args.published }),
            ...(args.tags && { tags: { create: tagWrites(args.tags) } }),
          },
          include: { tags: { include: { tag: true } } },
        });
      });
      return text(summaryOf(post));
    }
    case "list_tags": {
      const tags = await prisma.tag.findMany({
        select: { name: true, _count: { select: { blogPostTags: true } } },
        orderBy: { name: "asc" },
      });
      return text(tags.map((t) => ({ name: t.name, posts: t._count.blogPostTags })));
    }
  }
  return null;
}
