import { projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { getPublishedPosts, postPath, siteOrigin } from "@/lib/seo";

export const dynamic = "force-dynamic";

// llms.txt: a short, curated map of the site for language models (https://llmstxt.org).
export async function GET() {
  const origin = siteOrigin();
  const posts = await getPublishedPosts(50).catch(() => []);

  const lines = [
    `# ${siteConfig.author.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.author.name} is a software engineer on the integrations team at Perceptyx. He builds event-driven backend systems, runs a home Kubernetes cluster for his own projects, and writes about distributed systems, Postgres, Kubernetes and the tools he builds.`,
    "",
    "## Key pages",
    "",
    `- [About](${origin}/about): who I am and what I work on`,
    `- [Resume](${origin}/resume): experience, skills and education (PDF: ${origin}/resume.pdf)`,
    `- [Projects](${origin}/apps): everything I have built`,
    `- [Now](${origin}/now): what I am working on and learning at the moment`,
    `- [Blog](${origin}/blog): articles and notes`,
    "",
    "## Project case studies",
    "",
    ...projects.filter((p) => p.caseStudy).map((p) => `- [${p.name}](${origin}/projects/${p.slug}): ${p.tagline}`),
    "",
    "## Blog posts",
    "",
    ...(posts.length ? posts.map((p) => `- [${p.title}](${origin}${postPath(p)}): ${p.summary}`) : ["- No posts yet."]),
    "",
    "## Optional",
    "",
    `- [Full text of every post](${origin}/llms-full.txt)`,
    `- [RSS feed](${origin}/feed.xml)`,
    `- [Sitemap](${origin}/sitemap.xml)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=3600" },
  });
}
