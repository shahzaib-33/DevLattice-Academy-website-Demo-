// Copies the static export into ./artifact with the "_next" folder renamed to "nx",
// for hosts that reserve underscore-prefixed paths. Run after `npm run build:artifact`.
import fs from "node:fs";
import path from "node:path";

// Usage: node scripts/prepare-artifact.mjs [entry.html] [outDir]
const src = "out";
const entry = process.argv[2] ?? "index.html";
const dst = process.argv[3] ?? "artifact";
fs.rmSync(dst, { recursive: true, force: true });
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
for (const file of walk(src)) {
  const rel = path.relative(src, file);
  if (rel.endsWith(".txt") || rel.startsWith("_not-found") || path.basename(rel).startsWith("_")) continue;
  if (rel.endsWith(".html") && rel !== entry && rel !== "404.html") continue;
  const out = path.join(dst, rel === entry ? "index.html" : rel.replace(/^_next/, "nx"));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  if (/\.(html|js|css)$/.test(rel)) fs.writeFileSync(out, fs.readFileSync(file, "utf8").replaceAll("_next/", "nx/"));
  else fs.copyFileSync(file, out);
}
console.log("artifact ready");
