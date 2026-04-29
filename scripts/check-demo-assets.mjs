import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, "..");

const htmlPath = resolve(
  root,
  "public/portfolio-voorbeelden/live/fashion-ecommerce/index.html",
);

const html = readFileSync(htmlPath, "utf8");
const htmlDir = dirname(htmlPath);

const refs = new Set();

const attrPatterns = [
  /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi,
  /<link\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi,
  /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi,
  /<source\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi,
  /<source\b[^>]*\bsrcset=["']([^"']+)["'][^>]*>/gi,
];

function isIgnored(ref) {
  return /^(https?:|data:|mailto:|javascript:)/i.test(ref);
}

function pushSrcset(value) {
  const parts = value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean)
    .map((entry) => entry.split(/\s+/)[0])
    .filter(Boolean);
  for (const p of parts) refs.add(p);
}

for (const pattern of attrPatterns) {
  let m;
  while ((m = pattern.exec(html)) !== null) {
    const ref = m[1]?.trim();
    if (!ref || isIgnored(ref)) continue;
    if (pattern.source.includes("srcset")) {
      pushSrcset(ref);
    } else {
      refs.add(ref);
    }
  }
}

const resolved = [...refs].map((ref) => {
  const clean = ref.split("#")[0].split("?")[0];
  const abs = clean.startsWith("/")
    ? resolve(root, `public${clean}`)
    : resolve(htmlDir, clean);
  return { ref: clean, abs, exists: existsSync(abs) };
});

const missing = resolved.filter((r) => !r.exists);
const existing = resolved.length - missing.length;

console.log(`total references found: ${resolved.length}`);
console.log(`total existing: ${existing}`);
console.log(`total missing: ${missing.length}`);

if (missing.length) {
  console.log("missing list:");
  for (const m of missing) {
    console.log(`- ${m.ref} -> ${m.abs}`);
  }
  process.exit(1);
}
