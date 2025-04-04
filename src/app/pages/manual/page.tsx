import { DocLayout } from "@/components/doc-layout";
import Image from "next/image";

export default function Documentation() {
	return (
		<DocLayout>
			<div className="w-full">
				<div className="max-w-5xl mx-auto space-y-8">
					<div className="space-y-4">
						<h1 className="text-4xl font-bold tracking-tight">
							Documentação do Sistema APT
						</h1>
						<p className="text-xl text-muted-foreground">
							Guias, referências e recursos para trabalhar com o sistema APT.
						</p>
					</div>
				</div>
			</div>
		</DocLayout>
	);
}
