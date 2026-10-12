import { siteConfig } from "@/config/site";
import { getPublishedPosts, htmlToText, postPath, siteOrigin } from "@/lib/seo";

export const dynamic = "force-dynamic";

// The full text of every published post in one plain-text file, for tools that want to read it all.
export async function GET() {
  const origin = siteOrigin();
  const posts = await getPublishedPosts().catch(() => []);

  const sections = posts.map((post) =>
    [
      `# ${post.title}`,
      "",
      `URL: ${origin}${postPath(post)}`,
      `Published: ${post.createdAt.toISOString().slice(0, 10)}`,
      `Updated: ${post.updatedAt.toISOString().slice(0, 10)}`,
      ...(post.tags.length ? [`Tags: ${post.tags.map((t) => t.tag.name).join(", ")}`] : []),
      "",
      htmlToText(post.content),
    ].join("\n"),
  );

  const text = [`# ${siteConfig.author.name}: blog, full text`, "", ...sections.flatMap((s) => [s, "", "---", ""])].join("\n");
  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" },
  });
}
