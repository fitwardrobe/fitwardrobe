/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages requires static output.
  output: 'export',

  // `next/image` optimization needs a server; disable for static export.
  images: { unoptimized: true },

  // Ensures routes like `/privacy` work as `/privacy/index.html`.
  trailingSlash: true,

  // Low-memory machines: NEXT_BUILD_CPUS=1 limits the static-generation workers.
  ...(process.env.NEXT_BUILD_CPUS ? { experimental: { cpus: Number(process.env.NEXT_BUILD_CPUS) } } : {}),
}

export default nextConfig
