import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve("/var/www/next14-scaffold/public/portfolio-voorbeelden/live");

const dirs = readdirSync(root).filter((name) => {
  const full = path.join(root, name);
  return statSync(full).isDirectory() && existsSync(path.join(full, "index.html"));
});

const ATTR_RE = /<(script|link|img|source|video|audio)\b[^>]*?(src|href|srcset)=["']([^"']+)["']/gi;

const isLocal = (v) => !/^(https?:|data:|mailto:|javascript:|#)/i.test(v);

let hasMissing = false;

for (const slug of dirs) {
  const indexPath = path.join(root, slug, "index.html");
  const html = readFileSync(indexPath, "utf8");
  const refs = new Set();
  let m;
  while ((m = ATTR_RE.exec(html)) !== null) {
    const raw = m[3].trim();
    const values = m[2].toLowerCase() === "srcset" ? raw.split(",").map((s) => s.trim().split(/\s+/)[0]) : [raw];
    for (const v of values) {
      if (!v || !isLocal(v)) continue;
      refs.add(v.split("?")[0].split("#")[0]);
    }
  }

  const missing = [];
  let existing = 0;
  for (const ref of refs) {
    const target = ref.startsWith("/")
      ? path.join("/var/www/next14-scaffold/public", ref)
      : path.resolve(path.dirname(indexPath), ref);
    if (existsSync(target)) existing += 1;
    else missing.push(ref);
  }

  if (missing.length) hasMissing = true;
  console.log(`\\n[${slug}] total=${refs.size} existing=${existing} missing=${missing.length}`);
  if (missing.length) {
    for (const miss of missing) console.log(`  - ${miss}`);
  }
}

if (hasMissing) process.exit(1);
