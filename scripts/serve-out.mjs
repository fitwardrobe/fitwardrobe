// Serves the static export in out/ for the end-to-end tests (pnpm test:e2e).
// /path/ -> out/path/index.html; anything missing -> out/404.html with status 404.
import { createServer } from "node:http"
import { readFile, stat } from "node:fs/promises"
import { extname, join, normalize, sep } from "node:path"

const ROOT = join(process.cwd(), "out")
const PORT = Number(process.env.PORT ?? 4173)
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
}

async function resolveFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0].split("#")[0]))
  let file = join(ROOT, clean)
  if (file !== ROOT && !file.startsWith(ROOT + sep)) return null
  try {
    if ((await stat(file)).isDirectory()) file = join(file, "index.html")
    await stat(file)
    return file
  } catch {
    return null
  }
}

const server = createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/")
  const target = file ?? join(ROOT, "404.html")
  const body = await readFile(target).catch(() => Buffer.from("Not found"))
  res.writeHead(file ? 200 : 404, { "Content-Type": TYPES[extname(target)] ?? "application/octet-stream" })
  res.end(body)
})
// Keep idle connections open longer than the test client does, so a reused socket is never reset.
server.keepAliveTimeout = 65_000
server.headersTimeout = 66_000
server.listen(PORT, "127.0.0.1", () => console.log(`Serving out/ on http://127.0.0.1:${PORT}`))
