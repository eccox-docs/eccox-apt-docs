const withMDX = require("@next/mdx")({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
		providerImportSource: "@mdx-js/react",
	},
});

// Detecta se é build de produção
const isProd = process.env.NODE_ENV === "production";

// Lê basePath da variável de ambiente (usada no .env.production e .env.local)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

	...(isProd && {
		output: "export",
		basePath,
		assetPrefix: basePath,
		images: {
			unoptimized: true, // necessário para export com next/image
		},
	}),
};

module.exports = withMDX(nextConfig);
