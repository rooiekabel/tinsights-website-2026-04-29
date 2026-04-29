import { existsSync, readdirSync, statSync, copyFileSync } from "node:fs";
import path from "node:path";

const ROOT = "/var/www/next14-scaffold/public/portfolio-voorbeelden";
const LIVE = path.join(ROOT, "live");

const templates = {
  binabox: path.join(ROOT, "binabox-package", "binabox"),
  carola: path.join(ROOT, "carola pack", "carola"),
  montek: path.join(ROOT, "Montek-package", "Montek"),
  template: path.join(ROOT, "Template"),
  udrone: path.join(ROOT, "Udrone", "Udrone HTML"),
  crypgo: path.join(ROOT, "Crypgo-1.0.0", "out"),
  ashley: path.join(ROOT, "Ashley html template", "ashley"),
  furnish: path.join(ROOT, "furnish-1.0.0", "dist"),
};

const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const apply = process.argv.includes("--apply");

for (const [slug, srcRoot] of Object.entries(templates)) {
  const liveRoot = path.join(LIVE, slug);
  if (!existsSync(liveRoot) || !existsSync(srcRoot)) {
    console.log(`[${slug}] skipped (missing source or live)`);
    continue;
  }

  const liveFiles = walk(liveRoot).filter((p) => IMG_EXT.has(path.extname(p).toLowerCase()));
  let tiny = 0;
  let replaced = 0;

  for (const lf of liveFiles) {
    const rel = path.relative(liveRoot, lf);
    const sf = path.join(srcRoot, rel);
    const ls = statSync(lf).size;
    if (ls < 12000) tiny += 1;
    if (!existsSync(sf)) continue;
    const ss = statSync(sf).size;

    // Heuristic: replace if live looks placeholder-ish and source is significantly richer.
    if (ls < 12000 && ss > ls * 2 && ss > 18000) {
      if (apply) copyFileSync(sf, lf);
      replaced += 1;
    }
  }

  console.log(`[${slug}] images=${liveFiles.length} tiny_candidates=${tiny} replaced=${replaced}${apply ? " (applied)" : ""}`);
}
