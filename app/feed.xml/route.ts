import { siteConfig } from "@/config/site";
import { escapeXml, getPublishedPosts, postPath, siteOrigin } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function GET() {
  const origin = siteOrigin();
  const posts = await getPublishedPosts(30).catch(() => []);
  const updated = posts.reduce((newest, p) => (p.updatedAt > newest ? p.updatedAt : newest), new Date(0));

  const entries = posts
    .map((post) => {
      const url = `${origin}${postPath(post)}`;
      return `  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${url}" />
    <id>${url}</id>
    <published>${post.createdAt.toISOString()}</published>
    <updated>${post.updatedAt.toISOString()}</updated>
    <author><name>${escapeXml(siteConfig.author.name)}</name></author>
    <summary>${escapeXml(post.summary)}</summary>
${post.tags.map((t) => `    <category term="${escapeXml(t.tag.name)}" />`).join("\n")}
    <content type="html">${escapeXml(post.content)}</content>
  </entry>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(siteConfig.author.name)}: blog</title>
  <subtitle>${escapeXml(siteConfig.description)}</subtitle>
  <link href="${origin}/feed.xml" rel="self" />
  <link href="${origin}/blog" />
  <id>${origin}/</id>
  <updated>${(posts.length ? updated : new Date()).toISOString()}</updated>
  <author><name>${escapeXml(siteConfig.author.name)}</name></author>
${entries}
</feed>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" },
  });
}
