// Move a blog wave's dates to the day it actually goes live.
// Usage: node scripts/set-release-date.mjs <old-date> <new-date>   e.g. 2026-11-01 2026-11-12
// Changes "updated"/"date" values equal to <old-date> in src/content/posts/*.json and the matching
// page dates in src/app/sitemap.ts. Publish dates of existing posts are never this wave's date, so they stay put.
import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const [from, to] = process.argv.slice(2)
const iso = /^\d{4}-\d{2}-\d{2}$/
if (!iso.test(from ?? "") || !iso.test(to ?? "")) {
  console.error("Usage: node scripts/set-release-date.mjs <old YYYY-MM-DD> <new YYYY-MM-DD>")
  process.exit(1)
}

let changed = 0
const swap = (file, pattern, replacement) => {
  const before = readFileSync(file, "utf8")
  const after = before.replace(pattern, replacement)
  if (after !== before) {
    writeFileSync(file, after)
    const n = before.match(pattern)?.length ?? 0
    changed += n
    console.log(`${file}: ${n} date(s)`)
  }
}

const postsDir = "src/content/posts"
for (const name of readdirSync(postsDir).filter((f) => f.endsWith(".json"))) {
  swap(join(postsDir, name), new RegExp(`("(?:updated|date)": )"${from}"`, "g"), `$1"${to}"`)
}
swap("src/app/sitemap.ts", new RegExp(`(: )'${from}'`, "g"), `$1'${to}'`)

console.log(changed ? `Done: ${changed} date(s) moved from ${from} to ${to}.` : `No dates equal to ${from} found.`)
