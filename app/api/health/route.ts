export const dynamic = "force-dynamic";

// No database call on purpose: a database blip must not make Kubernetes restart the pod.
export function GET() {
  return Response.json({ status: "ok" });
}
