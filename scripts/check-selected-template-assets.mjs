import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const liveRoot = path.resolve("/var/www/next14-scaffold/public/portfolio-voorbeelden/live");
const publicRoot = path.resolve("/var/www/next14-scaffold/public");
const selectedSlugs = [
  "binabox",
  "carola",
  "crypgo",
  "fashion-ecommerce",
  "montek",
  "template",
  "udrone",
];

function collectHtmlFiles(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) collectHtmlFiles(full, acc);
    else if (entry.toLowerCase().endsWith(".html")) acc.push(full);
  }
  return acc;
}

const ATTR_RE = /<(script|link|img|source|video|audio|iframe)\b[^>]*?(src|href|poster|srcset)=['"]([^'"]+)['"]/gi;

const shouldIgnore = (ref) => {
  const v = ref.trim();
  return (
    !v ||
    /^https?:/i.test(v) ||
    /^mailto:/i.test(v) ||
    /^tel:/i.test(v) ||
    /^data:/i.test(v) ||
    /^javascript:/i.test(v) ||
    /^#/i.test(v)
  );
};

let totalMissing = 0;

for (const slug of selectedSlugs) {
  const slugDir = path.join(liveRoot, slug);
  if (!existsSync(slugDir) || !statSync(slugDir).isDirectory()) {
    console.log(`\n[${slug}] html_files=0 refs=0 missing_count=1`);
    console.log("  - <slug folder missing>");
    totalMissing += 1;
    continue;
  }

  const htmlFiles = collectHtmlFiles(slugDir, []);
  const refs = new Set();
  const missing = [];

  for (const htmlPath of htmlFiles) {
    const html = readFileSync(htmlPath, "utf8");
    let m;
    while ((m = ATTR_RE.exec(html)) !== null) {
      const attr = m[2].toLowerCase();
      const raw = m[3].trim();
      const candidates = attr === "srcset" ? raw.split(",").map((s) => s.trim().split(/\s+/)[0]) : [raw];

      for (const cand of candidates) {
        if (shouldIgnore(cand)) continue;
        const clean = cand.split("?")[0].split("#")[0].trim();
        if (!clean) continue;

        const key = `${htmlPath}::${clean}`;
        if (refs.has(key)) continue;
        refs.add(key);

        const resolved = clean.startsWith("/")
          ? path.join(publicRoot, clean)
          : path.resolve(path.dirname(htmlPath), clean);

        if (!existsSync(resolved)) {
          missing.push({ file: path.relative(slugDir, htmlPath), ref: clean });
        }
      }
    }
  }

  totalMissing += missing.length;
  console.log(`\n[${slug}] html_files=${htmlFiles.length} refs=${refs.size} missing_count=${missing.length}`);
  for (const item of missing.slice(0, 100)) {
    console.log(`  - ${item.file} :: ${item.ref}`);
  }
}

if (totalMissing > 0) process.exit(1);
