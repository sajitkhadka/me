// Seals the runtime secrets from .env.prod into a SealedSecret for k8s-config/me/.
// Usage: node deploy/seal-secrets.mjs <out-file>
// Needs kubectl access to the cluster (only to read the sealed-secrets public certificate).
// Prints key names only, never values.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const KEYS = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "AUTH_GOOGLE_ID",
  "AUTH_GOOGLE_SECRET",
  "AUTH_GITHUB_ID",
  "AUTH_GITHUB_SECRET",
  "GOOGLE_CLIENT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "GOOGLE_DRIVE_FOLDER_ID",
];

function parseEnv(text) {
  const out = {};
  const lines = text.replace(/\r/g, "").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (!m) continue;
    let value = m[2];
    const quote = value[0] === '"' || value[0] === "'" ? value[0] : "";
    if (quote) {
      while (!(value.length > 1 && value.endsWith(quote)) && i + 1 < lines.length) {
        value += "\n" + lines[++i];
      }
      value = value.slice(1, -1);
      if (quote === '"') value = value.replace(/\\n/g, "\n");
    } else {
      // Unquoted multi-line values (the PEM key) run until the next KEY= line.
      while (i + 1 < lines.length && lines[i + 1].trim() && !/^(#|[A-Z_][A-Z0-9_]*=)/.test(lines[i + 1])) {
        value += "\n" + lines[++i];
      }
    }
    out[m[1]] = value.trim();
  }
  return out;
}

const outFile = process.argv[2];
if (!outFile) throw new Error("usage: node deploy/seal-secrets.mjs <out-file>");

const env = parseEnv(readFileSync(".env.prod", "utf8"));
const missing = KEYS.filter((k) => !env[k]);
const present = KEYS.filter((k) => env[k]);
if (missing.length) console.log("Missing from .env.prod (add later with --merge-into):", missing.join(", "));

const key = env.GOOGLE_PRIVATE_KEY ?? "";
if (key && !(key.includes("BEGIN PRIVATE KEY") && key.includes("\n"))) {
  throw new Error("GOOGLE_PRIVATE_KEY did not parse as a multi-line PEM");
}

const secret = {
  apiVersion: "v1",
  kind: "Secret",
  metadata: { name: "me-secrets", namespace: "me" },
  stringData: Object.fromEntries(present.map((k) => [k, env[k]])),
};

const sealed = execFileSync(
  "kubeseal",
  ["--format", "yaml", "--controller-name", "sealed-secrets-controller", "--controller-namespace", "kube-system"],
  { input: JSON.stringify(secret) },
);
writeFileSync(outFile, sealed);
console.log("Sealed keys:", present.join(", "));
console.log("Wrote", outFile);
