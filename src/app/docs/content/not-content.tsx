import { DocLayout } from "@/components/doc-layout";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotContent() {
	return (
		<DocLayout>
			<div className="container flex flex-col items-center justify-center h-[70vh] text-center px-4">
				<FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
				<h1 className="text-3xl font-bold tracking-tight mb-2">
					Página não encontrada
				</h1>
				<p className="text-muted-foreground mb-6 max-w-md">
					A página que você está procurando não existe ou foi movida.
				</p>
				<Button asChild>
					<Link href="/">Voltar para a página inicial</Link>
				</Button>
			</div>
		</DocLayout>
	);
}
