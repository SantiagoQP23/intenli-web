// Renders the Google Play listing images into store/out/<listing>/:
//   icon-512.png, feature-graphic.png, phone-1..6.png, tablet-1..4.png,
//   alt-text.md, and contact-sheet.png for review.
// Then checks every file against Play's rules and fails if one breaks them.
//
//   pnpm store:assets            # all listings
//   pnpm store:assets es-419     # one listing
//
// Inputs: store/captions.mjs (text), store/shots/ (raw app screenshots, see
// store/README.md for how to capture them), the site's logo, font and colors.
import { mkdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";
import { listings } from "../store/captions.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "store/out");

// Brand colors, from src/styles/global.css.
const C = {
  coin: "#DCE7EE", // canvas
  coinDeep: "#8FAFC4", // the coin on a coin-blue canvas
  ink: "#1C1B19",
  surface: "#F2F2F2",
  border: "#DCDCDC",
};

// Inlined: a page loaded with setContent can't read file:// fonts.
const font = `data:font/woff2;base64,${readFileSync(
  join(root, "node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2"),
).toString("base64")}`;
const logoSvg = readFileSync(join(root, "src/assets/brand/logo.svg"), "utf8")
  .replace('fill="#1C1B19"', `fill="${C.ink}"`)
  .replace('fill="#DCE7EE"', `fill="${C.coinDeep}"`);

const dataUrl = (file) => `data:image/png;base64,${readFileSync(file).toString("base64")}`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const page = (w, h, body, css = "") => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: "Jakarta"; src: url("${font}") format("woff2"); font-weight: 200 800; }
* { box-sizing: border-box; margin: 0; }
html, body { width: ${w}px; height: ${h}px; overflow: hidden; }
body { font-family: "Jakarta", sans-serif; color: ${C.ink}; background: ${C.coin}; -webkit-font-smoothing: antialiased; }
${css}</style></head><body>${body}</body></html>`;

// 1080x1920: caption in the top band (under Play's 20% limit), the app screen
// below in the same simple frame the landing page uses.
const phoneHtml = (caption, shot) =>
  page(
    1080,
    1920,
    `<h1>${esc(caption)}</h1>
     <div class="frame"><img src="${dataUrl(shot)}"></div>`,
    `h1 { position: absolute; left: 90px; right: 90px; top: 96px; height: 200px; display: flex; align-items: center; justify-content: center;
          text-align: center; font-size: 66px; line-height: 1.15; font-weight: 650; letter-spacing: -0.02em; text-wrap: balance; }
     .frame { position: absolute; top: 352px; left: 50%; transform: translateX(-50%); width: 728px; padding: 16px;
          background: ${C.surface}; border: 2px solid ${C.border}; border-radius: 92px;
          box-shadow: 0 48px 96px -40px rgba(28, 27, 25, 0.45); }
     .frame img { display: block; width: 100%; height: auto; border-radius: 76px; }`,
  );

// 1024x500: headline left, full drawing right, both inside the centre so
// nothing important sits in the edges Play may crop or cover.
const featureHtml = (headline) =>
  page(
    1024,
    500,
    `<div class="wrap"><h1>${esc(headline)}</h1><div class="logo">${logoSvg}</div></div>`,
    `.wrap { position: absolute; inset: 0 120px; display: flex; align-items: center; gap: 28px; }
     h1 { flex: 1; font-size: 50px; line-height: 1.1; font-weight: 650; letter-spacing: -0.02em; text-wrap: balance; }
     .logo { width: 300px; height: 300px; flex: none; }
     .logo svg { width: 100%; height: 100%; display: block; }`,
  );

const sheetHtml = (dir, n) => {
  const img = (f, w) => `<figure><img src="${dataUrl(join(dir, f))}" style="width:${w}px"><figcaption>${f}</figcaption></figure>`;
  return page(
    1800,
    1250,
    `<div class="row">${img("icon-512.png", 180)}${img("feature-graphic.png", 640)}</div>
     <div class="row">${Array.from({ length: n.phone }, (_, i) => img(`phone-${i + 1}.png`, 270)).join("")}</div>
     <div class="row">${Array.from({ length: n.tablet }, (_, i) => img(`tablet-${i + 1}.png`, 420)).join("")}</div>`,
    `body { background: #fff; padding: 32px; display: flex; flex-direction: column; gap: 28px; }
     .row { display: flex; gap: 20px; align-items: flex-end; }
     figure img { display: block; border: 1px solid ${C.border}; }
     figcaption { font-size: 18px; margin-top: 6px; color: #6b6b6b; }`,
  );
};

async function render(browser, html, w, h, file) {
  const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await p.setContent(html, { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  const png = await p.screenshot({ type: "png" });
  await p.close();
  // Play wants 24-bit PNGs (no alpha) for everything but the icon.
  await sharp(png).flatten({ background: C.coin }).removeAlpha().png({ compressionLevel: 9 }).toFile(file);
}

// Play's rules, checked on the files we write.
async function check(file, rule) {
  const m = await sharp(file).metadata();
  const size = statSync(file).size;
  const long = Math.max(m.width, m.height);
  const short = Math.min(m.width, m.height);
  const problems = [];
  if (rule.exact && (m.width !== rule.exact[0] || m.height !== rule.exact[1])) problems.push(`must be ${rule.exact.join("x")}, is ${m.width}x${m.height}`);
  if (rule.alpha === true && !m.hasAlpha) problems.push("needs an alpha channel (32-bit PNG)");
  if (rule.alpha === false && m.hasAlpha) problems.push("must not have alpha (24-bit PNG)");
  if (rule.maxBytes && size > rule.maxBytes) problems.push(`is ${size} bytes, max ${rule.maxBytes}`);
  if (rule.sides && (short < rule.sides[0] || long > rule.sides[1])) problems.push(`sides must be ${rule.sides[0]}-${rule.sides[1]} px`);
  if (rule.ratio && Math.abs(long / short - 16 / 9) > 0.01) problems.push(`must be 16:9 or 9:16, is ${m.width}x${m.height}`);
  return problems.map((p) => `${file.slice(root.length + 1)}: ${p}`);
}

const MB = 1024 * 1024;
const RULES = {
  icon: { exact: [512, 512], alpha: true, maxBytes: 1 * MB },
  feature: { exact: [1024, 500], alpha: false, maxBytes: 15 * MB },
  phone: { alpha: false, maxBytes: 8 * MB, sides: [1080, 3840], ratio: true }, // 1080+ and 9:16 = eligible for recommendations
  tablet: { alpha: false, maxBytes: 8 * MB, sides: [1080, 7680], ratio: true },
};

const wanted = process.argv.slice(2);
const browser = await chromium.launch();
const problems = [];

for (const [id, L] of Object.entries(listings)) {
  if (wanted.length && !wanted.includes(id)) continue;
  const dir = join(out, id);
  mkdirSync(dir, { recursive: true });
  const shots = (kind, name) => join(root, "store/shots", kind, L.lang, `${name}.png`);

  // Icon: the app's own icon, 512 px, RGBA (Play rounds the corners itself).
  await sharp(join(root, "public/brand/icon.png")).resize(512, 512).ensureAlpha().png().toFile(join(dir, "icon-512.png"));
  problems.push(...(await check(join(dir, "icon-512.png"), RULES.icon)));

  await render(browser, featureHtml(L.feature.headline), 1024, 500, join(dir, "feature-graphic.png"));
  problems.push(...(await check(join(dir, "feature-graphic.png"), RULES.feature)));

  for (const [i, s] of L.phone.entries()) {
    const f = join(dir, `phone-${i + 1}.png`);
    await render(browser, phoneHtml(s.caption, shots("phone", s.shot)), 1080, 1920, f);
    problems.push(...(await check(f, RULES.phone)));
  }

  // Tablet: the raw 16:9 capture, no caption (Play crops text on large screens).
  for (const [i, s] of L.tablet.entries()) {
    const f = join(dir, `tablet-${i + 1}.png`);
    await sharp(shots("tablet", s.shot)).removeAlpha().png({ compressionLevel: 9 }).toFile(f);
    problems.push(...(await check(f, RULES.tablet)));
  }
  if (L.phone.length < 4 || L.phone.length > 8) problems.push(`${id}: needs 4-8 phone screenshots`);
  if (L.tablet.length && (L.tablet.length < 4 || L.tablet.length > 8)) problems.push(`${id}: needs 4-8 tablet screenshots`);

  const alts = [
    ["icon-512.png", L.icon.alt],
    ["feature-graphic.png", L.feature.alt],
    ...L.phone.map((s, i) => [`phone-${i + 1}.png`, s.alt]),
    ...L.tablet.map((s, i) => [`tablet-${i + 1}.png`, s.alt]),
  ];
  for (const [f, a] of alts) if (a.length > 140) problems.push(`${id}/${f}: alt text is ${a.length} characters, max 140`);
  writeFileSync(
    join(dir, "alt-text.md"),
    `# Alt text, ${id}\n\nPaste each line into Play Console > Main store listing > Graphics, next to its image.\n\n` +
      `| File | Alt text |\n| --- | --- |\n` +
      alts.map(([f, a]) => `| ${f} | ${a} |`).join("\n") +
      "\n",
  );

  await render(browser, sheetHtml(dir, { phone: L.phone.length, tablet: L.tablet.length }), 1800, 1250, join(dir, "contact-sheet.png"));
  console.log(`${id}: done`);
}

await browser.close();
if (problems.length) {
  console.error(`\nPlay rules broken:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log("All images pass Play's size, ratio, alpha and file size rules.");
