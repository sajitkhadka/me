import { CORS, oauthError, registerClient } from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return oauthError(400, "invalid_client_metadata", "send a JSON body");
  return registerClient(body);
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
