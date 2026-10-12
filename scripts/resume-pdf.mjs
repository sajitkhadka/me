// Renders /resume/print from a running server into public/resume.pdf.
// Usage: node scripts/resume-pdf.mjs [baseUrl]   (default http://localhost:3000)
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const base = process.argv[2] ?? "http://localhost:3000";
const browsers = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];
const browser = browsers.find(existsSync);
if (!browser) throw new Error("No Chrome or Edge found");

execFileSync(browser, [
  "--headless",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${resolve("public/resume.pdf")}`,
  `${base}/resume/print`,
]);
console.log("Wrote public/resume.pdf");
