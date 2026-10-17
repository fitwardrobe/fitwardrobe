// Adds <link rel="preload"> hints for the two faces that render first text
// (Noto Serif Display roman and Jost, latin subset) to every exported HTML page.
// next/font normally does this, but its font manifest comes out empty with
// `output: "export"` in Next 15.5, so the hints were missing. Safe to re-run.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

const OUT = "out"
const cssDir = join(OUT, "_next/static/css")

const css = readdirSync(cssDir)
  .filter((f) => f.endsWith(".css"))
  .map((f) => readFileSync(join(cssDir, f), "utf8"))
  .join("\n")

const faces = css.match(/@font-face\{[^}]*\}/g) ?? []
const pick = (family) =>
  faces
    .filter((f) => f.includes(`font-family:${family};`) || f.includes(`font-family:"${family}";`))
    .filter((f) => f.includes("font-style:normal"))
    .filter((f) => /unicode-range:u\+00(\?\?|00-00ff)/i.test(f))
    .map((f) => f.match(/url\(([^)]+\.woff2)\)/)?.[1])
    .find(Boolean)

const files = [pick("Noto Serif Display"), pick("Jost")].filter(Boolean)
if (files.length === 0) {
  console.warn("preload-fonts: no matching faces found; nothing injected")
  process.exit(0)
}
const tags = files
  .map((href) => `<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin=""/>`)
  .join("")

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else if (name.endsWith(".html")) inject(p)
  }
}
let count = 0
function inject(file) {
  let html = readFileSync(file, "utf8")
  if (html.includes('as="font"')) return
  const marker = '<meta name="viewport"'
  const at = html.indexOf(marker)
  if (at === -1) return
  const end = html.indexOf(">", at) + 1
  html = html.slice(0, end) + tags + html.slice(end)
  writeFileSync(file, html)
  count++
}
walk(OUT)
console.log(`preload-fonts: ${files.join(", ")} -> ${count} pages`)
