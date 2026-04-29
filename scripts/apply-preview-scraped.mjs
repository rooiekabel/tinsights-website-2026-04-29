import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve("/var/www/next14-scaffold");
const previewRoot = path.join(repoRoot, "public/portfolio-voorbeelden/preview-scraped");
const liveRoot = path.join(repoRoot, "public/portfolio-voorbeelden/live");
const notesPath = path.join(previewRoot, "NOTES-template.md");

const mediaExtRe = /\.(png|jpe?g|webp|avif|gif|svg)$/i;
const assetRoots = new Set(["assets", "img", "images", "media", "uploads", "upload", "photos"]);
const slugs = fs
  .readdirSync(previewRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const toPosix = (v) => v.replaceAll("\\", "/");

const collectFilesRecursive = (dir, acc = []) => {
  if (!fs.existsSync(dir)) return acc;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectFilesRecursive(full, acc);
    else acc.push(full);
  }
  return acc;
};

const collectHtmlFiles = (dir) =>
  collectFilesRecursive(dir).filter((file) => file.toLowerCase().endsWith(".html"));

const collectRefs = (htmlPath) => {
  const html = fs.readFileSync(htmlPath, "utf8");
  const refs = [];
  const attrRe = /<(img|source|video|audio|link|script|iframe)\b[^>]*?(src|href|poster|srcset)=["']([^"']+)["']/gi;
  let m;
  while ((m = attrRe.exec(html)) !== null) {
    const attr = m[2].toLowerCase();
    const raw = m[3].trim();
    const candidates = attr === "srcset" ? raw.split(",").map((s) => s.trim().split(/\s+/)[0]) : [raw];
    for (const cand of candidates) {
      if (!cand) continue;
      if (/^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(cand)) continue;
      const clean = cand.split("?")[0].split("#")[0].trim();
      if (clean) refs.push(clean);
    }
  }
  return refs;
};

const normalizedPathname = (sourceUrl) => {
  try {
    const u = new URL(sourceUrl);
    return decodeURIComponent(u.pathname).replace(/\/+/g, "/");
  } catch {
    return "";
  }
};

const suffixCandidates = (pathnameValue) => {
  const clean = pathnameValue.replace(/^\/+/, "");
  const parts = clean.split("/").filter(Boolean);
  const candidates = [];
  for (let i = 0; i < parts.length; i += 1) {
    candidates.push(parts.slice(i).join("/"));
  }
  return candidates;
};

const preferredSuffix = (pathnameValue) => {
  const clean = pathnameValue.replace(/^\/+/, "");
  const parts = clean.split("/").filter(Boolean);
  const markerIdx = parts.findIndex((p) => assetRoots.has(p.toLowerCase()));
  if (markerIdx >= 0) return parts.slice(markerIdx).join("/");
  if (parts.length >= 3) return parts.slice(parts.length - 3).join("/");
  return parts.join("/");
};

const scoreCandidate = (candidate, liveSetLower) => {
  const lower = candidate.toLowerCase();
  const isLiveExact = liveSetLower.has(lower);
  let score = 0;
  if (isLiveExact) score += 5000;
  score += candidate.split("/").length * 30;
  if (/^(assets|img|images)\//i.test(candidate)) score += 200;
  if (mediaExtRe.test(candidate)) score += 25;
  return score;
};

const buildManifestIndex = (slug, liveSetLower) => {
  const manifestPath = path.join(previewRoot, slug, "manifest.json");
  if (!fs.existsSync(manifestPath)) return { entries: [], byRelKey: new Map(), byPathSuffix: [] };
  const parsed = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const byRelKey = new Map();
  const byPathSuffix = [];

  for (const item of parsed) {
    const pathnameValue = normalizedPathname(item.source_url || "");
    if (!pathnameValue || !mediaExtRe.test(pathnameValue)) continue;
    const sourceFile = path.join(previewRoot, item.local_file || "");
    if (!fs.existsSync(sourceFile)) continue;

    const candidates = suffixCandidates(pathnameValue);
    let best = "";
    let bestScore = -1;
    for (const candidate of candidates) {
      const s = scoreCandidate(candidate, liveSetLower);
      if (s > bestScore) {
        best = candidate;
        bestScore = s;
      }
    }
    if (!best) best = preferredSuffix(pathnameValue);

    const tieKey = best.toLowerCase();
    const existing = byRelKey.get(tieKey);
    const nextRecord = {
      relKey: best,
      sourceFile,
      sourceUrlPath: pathnameValue,
      fileSize: item.file_size || fs.statSync(sourceFile).size,
      sourceUrl: item.source_url || "",
    };
    if (!existing) {
      byRelKey.set(tieKey, nextRecord);
    } else {
      const existingDepth = existing.sourceUrlPath.split("/").length;
      const nextDepth = pathnameValue.split("/").length;
      if (nextDepth > existingDepth || (nextDepth === existingDepth && nextRecord.fileSize > existing.fileSize)) {
        byRelKey.set(tieKey, nextRecord);
      }
    }
    byPathSuffix.push(nextRecord);
  }

  return { entries: parsed, byRelKey, byPathSuffix };
};

const resolveRelForRef = (ref, htmlPath, slugRoot) => {
  if (ref.startsWith("/")) {
    return toPosix(path.relative(slugRoot, path.join(path.join(repoRoot, "public"), ref)));
  }
  const resolved = path.resolve(path.dirname(htmlPath), ref);
  return toPosix(path.relative(slugRoot, resolved));
};

const copyIfPossible = (slugRoot, relKey, record, stats) => {
  const rel = relKey.replace(/^\/+/, "");
  const destination = path.join(slugRoot, rel);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(record.sourceFile, destination);
  stats.copied += 1;
  stats.destinations.add(rel);
};

const slugStats = [];

for (const slug of slugs) {
  const slugRoot = path.join(liveRoot, slug);
  const manifestPath = path.join(previewRoot, slug, "manifest.json");
  if (!fs.existsSync(slugRoot) || !fs.existsSync(manifestPath)) {
    continue;
  }

  const liveFiles = collectFilesRecursive(slugRoot)
    .filter((f) => mediaExtRe.test(f))
    .map((f) => toPosix(path.relative(slugRoot, f)));
  const liveSetLower = new Set(liveFiles.map((f) => f.toLowerCase()));

  const { entries, byRelKey, byPathSuffix } = buildManifestIndex(slug, liveSetLower);
  const stats = {
    slug,
    manifestEntries: entries.length,
    matchedPhase1: 0,
    copied: 0,
    unresolvedPhase2: 0,
    destinations: new Set(),
  };

  if (entries.length === 0) {
    slugStats.push(stats);
    continue;
  }

  // Phase 2: materialize directly from manifest -> best relKey
  for (const record of byRelKey.values()) {
    copyIfPossible(slugRoot, record.relKey, record, stats);
    stats.matchedPhase1 += 1;
  }

  // Phase 3: fill missing refs by suffix match
  const htmlFiles = collectHtmlFiles(slugRoot);
  const unresolved = [];
  for (const htmlPath of htmlFiles) {
    const refs = collectRefs(htmlPath);
    for (const ref of refs) {
      const relFromRef = resolveRelForRef(ref, htmlPath, slugRoot).replace(/^\/+/, "");
      if (!mediaExtRe.test(relFromRef)) continue;
      const destination = path.join(slugRoot, relFromRef);
      if (fs.existsSync(destination)) continue;

      const refLower = relFromRef.toLowerCase();
      let best = null;
      for (const record of byPathSuffix) {
        const sourceLower = record.sourceUrlPath.replace(/^\/+/, "").toLowerCase();
        if (sourceLower.endsWith(refLower)) {
          if (!best || record.sourceUrlPath.length > best.sourceUrlPath.length) best = record;
        }
      }
      if (best) {
        copyIfPossible(slugRoot, relFromRef, best, stats);
      } else {
        unresolved.push({ file: toPosix(path.relative(slugRoot, htmlPath)), ref: relFromRef });
      }
    }
  }

  stats.unresolvedPhase2 = unresolved.length;
  slugStats.push(stats);
}

const barbercropManifest = path.join(previewRoot, "barbercrop", "manifest.json");
if (fs.existsSync(barbercropManifest)) {
  const parsed = JSON.parse(fs.readFileSync(barbercropManifest, "utf8"));
  if (Array.isArray(parsed) && parsed.length === 0) {
    fs.writeFileSync(
      notesPath,
      [
        "# Template Mapping Note",
        "",
        "Slug `template` (barbercrop) has no usable scraped pool in `preview-scraped/barbercrop/manifest.json`.",
        "Automated suffix mapping is skipped for this slug to avoid breaking existing working assets in `live/template`.",
      ].join("\n"),
      "utf8",
    );
  }
}

for (const s of slugStats) {
  console.log(
    `[${s.slug}] manifest=${s.manifestEntries} phase1=${s.matchedPhase1} copied=${s.copied} unique_dests=${s.destinations.size} unresolved_phase2=${s.unresolvedPhase2}`,
  );
}
