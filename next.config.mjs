/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages requires static output.
  output: 'export',

  // `next/image` optimization needs a server; disable for static export.
  images: { unoptimized: true },

  // Ensures routes like `/privacy` work as `/privacy/index.html`.
  trailingSlash: true,
}

export default nextConfig
