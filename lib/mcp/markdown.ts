import MarkdownIt from "markdown-it";

// Raw HTML in the source is escaped, so a post written by an assistant cannot smuggle in markup.
const md = new MarkdownIt({ html: false, linkify: true, breaks: false });

// The post title is the page's <h1>. If the body has its own, push every heading down a level.
md.core.ruler.push("demote_headings", (state) => {
  const headings = state.tokens.filter((t) => t.type === "heading_open");
  if (!headings.some((t) => t.tag === "h1")) return;
  for (const token of state.tokens) {
    if (token.type === "heading_open" || token.type === "heading_close") {
      token.tag = `h${Math.min(Number(token.tag[1]) + 1, 6)}`;
    }
  }
});

export const markdownToHtml = (source: string) => md.render(source);

/** First paragraph as plain text, for posts saved without a summary. */
export function summarize(source: string, max = 160): string {
  const plain = source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^#{1,6}\s.*$/gm, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s*(>|[-*+]|\d+\.)\s+/gm, "")
    .replace(/(\*\*|__|\*|`)/g, "")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .find((p) => p.length > 0) ?? "";
  return plain.length <= max ? plain : plain.slice(0, max - 1).trimEnd() + "…";
}
