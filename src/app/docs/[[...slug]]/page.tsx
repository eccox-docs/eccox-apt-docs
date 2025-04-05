import { readFile } from "node:fs/promises";
import path from "node:path";
import { EditPage } from "@/components/doc-edit-page";
import { DocLayout } from "@/components/doc-layout";
import { useMDXComponents } from "@/components/mdx/use-mdx-components";
import { Separator } from "@/components/ui/separator";
import { getStaticMdxParams } from "@/lib/get-static-mdx-params";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import NotContent from "../content/not-content";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function DocPage({ params }: any) {
	// Aguarda a resolução dos parâmetros antes de acessá-los
	const resolvedParams = await params;
	const slugPath = resolvedParams.slug?.join("/") || "manual";
	const filePath = path.join(
		process.cwd(),
		"src/app/docs/content",
		`${slugPath}.mdx`,
	);

	try {
		const fileContent = await readFile(filePath, "utf-8");
		const { content, data } = matter(fileContent);

		const { content: mdxContent } = await compileMDX({
			source: content,
			options: { parseFrontmatter: false },
			components: useMDXComponents({}),
		});

		const githubEditUrl = `https://github.com/DiogoEccox/eccox-apt-docs/edit/main/src/app/docs/content/${slugPath}.mdx`;

		return (
			<DocLayout>
				<div className="w-full py-10 px-4 md:px-6">
					<div className="max-w-4xl mx-auto">
						<div className="flex justify-between items-center mb-8">
							<h1 className="text-3xl font-bold tracking-tight">
								{data.title}
							</h1>
							<EditPage url={githubEditUrl} />
						</div>
						<Separator orientation="horizontal" />
						{mdxContent}
					</div>
				</div>
			</DocLayout>
		);
	} catch (error) {
		console.error("Error loading MDX file:", error);
		return <NotContent />;
	}
}

//função obrigatória com output: export
export async function generateStaticParams() {
	return getStaticMdxParams();
}
