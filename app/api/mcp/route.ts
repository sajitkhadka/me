import { NextResponse } from "next/server";
import { authenticateBearer } from "@/lib/mcp/tokens";
import { publicOrigin } from "@/lib/mcp/origin";
import { handleMessage } from "@/lib/mcp/server";

export const dynamic = "force-dynamic";

// MCP over Streamable HTTP, POST only: this server never starts a message of its own, so there is
// no stream to open. See docs/adr/0001-mcp-blog-publishing.md.
export async function POST(req: Request) {
  const principal = await authenticateBearer(req.headers.get("authorization"));
  if (!principal) {
    return new NextResponse("A token is required: Authorization: Bearer sk_me_...", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Bearer realm="sajitkhadka.com", resource_metadata="${publicOrigin(req)}/.well-known/oauth-protected-resource/api/mcp"`,
      },
    });
  }

  const raw = await req.text();
  if (raw.length > 1_000_000) return NextResponse.json({ error: "body too large" }, { status: 413 });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "invalid JSON" } }, { status: 400 });
  }

  if (Array.isArray(body)) {
    const replies = (await Promise.all(body.map((m) => handleMessage(principal, m)))).filter(Boolean);
    return replies.length ? NextResponse.json(replies) : new NextResponse(null, { status: 202 });
  }
  const reply = await handleMessage(principal, body as any);
  return reply ? NextResponse.json(reply) : new NextResponse(null, { status: 202 });
}

export function GET() {
  return new NextResponse("This server opens no SSE stream.", { status: 405, headers: { Allow: "POST" } });
}
