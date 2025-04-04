import withMDX from "@next/mdx";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = withMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
		// Se quiser usar componentes React em seus arquivos MDX:
		providerImportSource: "@mdx-js/react",
	},
})({
	reactStrictMode: true,
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});

export default nextConfig;
