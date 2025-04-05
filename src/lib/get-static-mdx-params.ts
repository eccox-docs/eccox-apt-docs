import { readdir } from "node:fs/promises";
import path from "node:path";

export async function getStaticMdxParams() {
	const contentPath = path.join(process.cwd(), "src/app/docs/content");

	async function getAllMdxFiles(dir: string): Promise<string[][]> {
		const entries = await readdir(dir, { withFileTypes: true });

		const paths = await Promise.all(
			entries.map(async (entry) => {
				const fullPath = path.join(dir, entry.name);
				if (entry.isDirectory()) {
					return getAllMdxFiles(fullPath);
				}
				if (entry.isFile() && entry.name.endsWith(".mdx")) {
					const relativePath = path.relative(contentPath, fullPath);
					const slugArray = relativePath.replace(/\.mdx$/, "").split(path.sep);
					return [slugArray];
				}
				return [];
			}),
		);

		return paths.flat();
	}

	const slugs = await getAllMdxFiles(contentPath);
	return slugs.map((slug) => ({ slug }));
}
