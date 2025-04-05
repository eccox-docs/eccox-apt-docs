const withMDX = require("@next/mdx")({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
		providerImportSource: "@mdx-js/react",
	},
});

// Detecta ambiente de produção
const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],

	// Adiciona basePath e assetPrefix apenas em produção
	...(isProd && {
		output: "export",
		basePath: "/eccox-apt-docs",
		assetPrefix: "/eccox-apt-docs",
		images: {
			unoptimized: true,
		},
	}),
};

// Exporta a configuração final
module.exports = withMDX(nextConfig);
