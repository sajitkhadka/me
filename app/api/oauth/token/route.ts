import { CORS, exchangeToken, oauthError } from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const raw = await req.text();
  if (raw.length > 16_384) return oauthError(413, "invalid_request", "body too large");
  return exchangeToken(new URLSearchParams(raw));
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
