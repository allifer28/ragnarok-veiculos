/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
  domains: ["localhost", "lh3.googleusercontent.com"],
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**",
    },
  ],
  unoptimized: true,
},

  // Configuração para evitar problemas com módulos nativos no cliente
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Evitar que módulos do servidor sejam incluídos no bundle do cliente
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      }
    }
    return config
  },
}

export default nextConfig
