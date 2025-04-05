import withMDX from "@next/mdx";
import type { NextConfig } from "next";

// Detecta ambiente de produção
const isProd = process.env.NODE_ENV === "production";

// Configuração do MDX
const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react"
  }
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

  // Usa exportação estática apenas em produção
  ...(isProd && {
    output: "export",
    images: {
      unoptimized: true
    }
  })
};

// Exporta a configuração final
export default withMDXConfig(nextConfig);
