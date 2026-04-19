import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Solo desarrollo: quita el icono “N” fijo en la esquina */
  devIndicators: false,
  /** No enviar cabecera que identifica el stack */
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    /**
     * Calidades JPEG/WebP/AVIF permitidas por `next/image`. A partir de Next 16 hay que listar
     * aquí todos los valores de `quality` que el sitio usa de verdad (75 = default de next/image,
     * 70 = thumbnails de producto, 90 = hero de alta resolución).
     */
    qualities: [70, 75, 90],
    remotePatterns: [
      { protocol: "https", hostname: "buitrago.shop", pathname: "/**" },
      { protocol: "https", hostname: "www.buitrago.shop", pathname: "/**" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
