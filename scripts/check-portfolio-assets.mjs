import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = resolve(projectRoot, "public");

const entries = [
  resolve(publicRoot, "portfolio-voorbeelden/live/furnish/index.html"),
  resolve(publicRoot, "portfolio-voorbeelden/live/crypgo/index.html"),
];

const ATTR_REGEX = /\b(?:src|href)=["']([^"']+)["']/gi;

function isLocalAsset(ref) {
  if (!ref) return false;
  if (/^(https?:|mailto:|data:|javascript:|#)/i.test(ref)) return false;
  const clean = ref.split("?")[0].split("#")[0].toLowerCase();
  if (clean.includes("/_next/")) return true;
  return /\.(css|js|mjs|png|jpg|jpeg|gif|webp|svg|ico|woff|woff2|ttf|eot|map|mp4|webm|avif|html)$/i.test(clean);
}

function resolveRef(htmlFile, ref) {
  if (ref.startsWith("/")) {
    return resolve(publicRoot, ref.slice(1));
  }
  return resolve(dirname(htmlFile), ref);
}

let totalAssets = 0;
const missing = [];

for (const entry of entries) {
  const html = readFileSync(entry, "utf8");
  const seen = new Set();
  let match;

  while ((match = ATTR_REGEX.exec(html)) !== null) {
    const ref = match[1].trim();
    if (!isLocalAsset(ref)) continue;
    const cleanRef = ref.split("?")[0].split("#")[0];
    if (!cleanRef) continue;
    seen.add(cleanRef);
  }

  const refs = [...seen];
  totalAssets += refs.length;

  for (const ref of refs) {
    const target = resolveRef(entry, ref);
    if (!existsSync(target)) {
      missing.push({ entry, ref, target });
    }
  }
}

console.log(`Total assets checked: ${totalAssets}`);
console.log(`Missing assets: ${missing.length}`);
if (missing.length > 0) {
  console.log("Missing asset list:");
  for (const item of missing) {
    console.log(`- ${item.ref}`);
    console.log(`  entry: ${item.entry}`);
    console.log(`  resolved: ${item.target}`);
  }
  process.exit(1);
}
