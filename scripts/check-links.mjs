// Checks the built site (dist/) so the URLs the app stores link to never
// break: every required page exists, and every internal link or asset on
// every page points at a file that was built.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const dist = new URL("../dist/", import.meta.url).pathname;

// Linked from Google Play and the App Store: these must always exist.
const required = [
  "/money",
  "/money/privacy",
  "/money/terms",
  "/money/delete-account",
  "/money/delete-account/confirm",
  "/en/money",
  "/en/money/privacy",
  "/en/money/terms",
  "/en/money/delete-account",
  "/en/money/delete-account/confirm",
];

// How Vercel (cleanUrls) resolves a path to a file.
function resolve(path) {
  const clean = path.replace(/[?#].*$/, "").replace(/\/$/, "") || "/";
  const candidates = clean === "/" ? ["index.html"] : [clean.slice(1), `${clean.slice(1)}.html`, `${clean.slice(1)}/index.html`];
  return candidates.map((c) => join(dist, c)).find((f) => existsSync(f) && statSync(f).isFile());
}

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith(".html") ? [full] : [];
  });
}

const problems = [];
for (const path of required) {
  if (!resolve(path)) problems.push(`missing required page ${path}`);
}
for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, "utf8");
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    if (url.startsWith("//")) continue;
    if (!resolve(decodeURI(url))) problems.push(`${relative(dist, file)} links to missing ${url}`);
  }
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`links ok (${required.length} required pages)`);
