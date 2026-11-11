// Tell Bing (and other IndexNow engines) about changed URLs after a release. Run only after the deploy is live:
//   node scripts/indexnow.mjs https://fitwardrobe.me/blog/x/ https://fitwardrobe.me/y/
// The key file public/a0c7cdba5c191c2da3defeb560681978.txt must be live at https://fitwardrobe.me/a0c7cdba5c191c2da3defeb560681978.txt first.
const KEY = "a0c7cdba5c191c2da3defeb560681978"
const urls = process.argv.slice(2)
if (!urls.length || !urls.every((u) => u.startsWith("https://fitwardrobe.me/"))) {
  console.error("Usage: node scripts/indexnow.mjs <https://fitwardrobe.me/... URLs>")
  process.exit(1)
}
const keyLocation = `https://fitwardrobe.me/${KEY}.txt`
const live = await fetch(keyLocation)
if (!live.ok || (await live.text()).trim() !== KEY) {
  console.error(`Key file not live at ${keyLocation}; deploy first.`)
  process.exit(1)
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: "fitwardrobe.me", key: KEY, keyLocation, urlList: urls }),
})
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`)
