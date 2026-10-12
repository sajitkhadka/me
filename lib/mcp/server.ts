import { callTool, toolDefinitions } from "./tools";
import type { McpPrincipal } from "./tokens";

const PROTOCOL_VERSION = "2025-06-18";
const SUPPORTED = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];

type Id = string | number | null | undefined;
type RpcRequest = { jsonrpc?: string; id?: Id; method?: string; params?: any };
type RpcResponse = { jsonrpc: "2.0"; id: string | number | null; result?: unknown; error?: { code: number; message: string } };

const result = (id: Id, value: unknown): RpcResponse => ({ jsonrpc: "2.0", id: id ?? null, result: value });
const error = (id: Id, code: number, message: string): RpcResponse => ({
  jsonrpc: "2.0",
  id: id ?? null,
  error: { code, message },
});

/** Handles one JSON-RPC message. Returns null for a notification, which gets no reply. */
export async function handleMessage(principal: McpPrincipal, req: RpcRequest): Promise<RpcResponse | null> {
  if (!req || req.jsonrpc !== "2.0" || typeof req.method !== "string") {
    return error(req?.id, -32600, "not a JSON-RPC 2.0 request");
  }
  if (req.id === undefined) return null;

  switch (req.method) {
    case "initialize": {
      const asked = req.params?.protocolVersion;
      return result(req.id, {
        protocolVersion: SUPPORTED.includes(asked) ? asked : PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "sajitkhadka-blog", title: "sajitkhadka.com blog", version: "1.0.0" },
        instructions:
          "Manage blog posts on sajitkhadka.com. Posts are written in Markdown and saved as drafts by default; " +
          "only publish when the author says so. Call list_tags before tagging so existing tags are reused.",
      });
    }
    case "ping":
      return result(req.id, {});
    case "tools/list":
      return result(req.id, { tools: toolDefinitions });
    case "tools/call": {
      try {
        const out = await callTool(principal, req.params?.name, req.params?.arguments);
        if (!out) return error(req.id, -32602, `unknown tool: ${req.params?.name}`);
        return result(req.id, out);
      } catch (err) {
        // Detail stays in the server log; the caller is on the internet.
        console.error(`mcp: tool ${req.params?.name} failed`, err);
        return result(req.id, { content: [{ type: "text", text: "The tool failed on the server." }], isError: true });
      }
    }
    default:
      return error(req.id, -32601, `unknown method: ${req.method}`);
  }
}
