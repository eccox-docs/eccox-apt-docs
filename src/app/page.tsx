import { DocLayout } from "@/components/doc-layout";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ArrowRight,
	FileCode,
	Github,
	Laptop,
	Lightbulb,
	Rocket,
	Terminal,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
	return (
		<DocLayout>
			<div className="w-full pt-6">
				<div className="max-w-5xl mx-auto space-y-8">
					<div className="space-y-4">
						<h1 className="text-4xl font-bold tracking-tight">
							Documentação do Sistema APT
						</h1>
						<p className="text-xl text-muted-foreground">
							Guias, referências e recursos para trabalhar com o sistema APT.
						</p>
					</div>

					{/* Banner versões */}
					<div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-center gap-4">
						<div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
							<Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
						</div>
						<div className="flex-1">
							<h3 className="font-semibold text-blue-700 dark:text-blue-300">
								Nova versão do APT em desenvolvimento
							</h3>
							<p className="text-blue-600 dark:text-blue-400">
								Acompanhe o progresso e descubra as novidades antes do
								lançamento.
							</p>
						</div>
						<Button
							variant="outline"
							className="bg-white dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-800"
						>
							Saiba mais <ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						{/* Novo recurso disponível */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Terminal className="h-5 w-5" />
									<span>Novo Recurso Disponível</span>
								</CardTitle>
								<CardDescription>
									Explore as funcionalidades mais recentes do APT
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<p>
									Conheça os novos comandos e melhorias implementadas na última
									atualização do APT
								</p>
								<Button asChild className="w-full">
									<Link href="/docs/guides">
										<span>Ver Novidades</span>
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<FileCode className="h-5 w-5" />
									<span>Guias</span>
								</CardTitle>
								<CardDescription>
									Tutoriais detalhados e exemplos práticos
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<p>
									Explore nossos guias passo a passo para aprender a utilizar
									todos os recursos do sistema APT.
								</p>
								<Button asChild variant="outline" className="w-full">
									<Link href="/docs/guides">
										<span>Ver Guias</span>
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Laptop className="h-5 w-5" />
									<span>Exemplos em Vídeo</span>
								</CardTitle>
								<CardDescription>
									Demonstrações práticas em vídeo para facilitar o aprendizado
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<p>
									Assista a tutoriais em vídeo explicando o funcionamento do APT
									na prática, com exemplos reais e dicas valiosas.
								</p>
								<Button asChild variant="outline" className="w-full">
									<Link href="/docs/video-examples">
										<span>Assistir Vídeos</span>
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Github className="h-5 w-5" />
									<span>Contribua</span>
								</CardTitle>
								<CardDescription>
									Ajude a melhorar a documentação
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<p>
									Esta documentação é de código aberto. Você pode contribuir com
									melhorias através do GitHub.
								</p>
								<Button asChild variant="outline" className="w-full">
									<a
										href="https://github.com/seu-usuario/apt-docs"
										target="_blank"
										rel="noopener noreferrer"
									>
										<span>Ver no GitHub</span>
										<ArrowRight className="ml-2 h-4 w-4" />
									</a>
								</Button>
							</CardContent>
						</Card>


					</div>
				</div>
			</div>
		</DocLayout>
	);
}
