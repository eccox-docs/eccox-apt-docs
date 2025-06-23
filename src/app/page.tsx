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
	BookOpen,
	Github,
	GraduationCap,
	History,
	Rocket,
	TvMinimalPlay,
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
								Novidades da próxima atualização do APT
							</h3>
							<p className="text-blue-600 dark:text-blue-400">
								Confira os recursos e melhorias que estão chegando na versão{" "}
								<strong>v2.0.7.6</strong> do APT.
							</p>
						</div>
						<Button
							asChild
							variant="outline"
							className="bg-white dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-800"
						>
							<Link href="/docs/novidades">
								<span>Ver Novidades</span>
								<ArrowRight className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						{/* Novo recurso disponível */}
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<History className="h-5 w-5" />
									<span>Consulte o histórico de versões do APT</span>
								</CardTitle>
								<CardDescription>
									Descubra as novidades e melhorias de cada versão
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<p>
									Acompanhe o que mudou em cada versão, incluindo melhorias,
									correções e novos recursos.
								</p>
								<Button
									asChild
									className="w-full text-white bg-blue-600 hover:bg-blue-700"
								>
									<Link href="/docs/registro-de-alteracoes">
										<span>Ver Versões</span>
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<BookOpen className="h-5 w-5" />
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
									<Link href="/docs/manual">
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
									<TvMinimalPlay className="h-5 w-5" />
									<span>Guia em Vídeo do Eccox APT</span>
								</CardTitle>
								<CardDescription>
									Aprenda na prática como usar o APT com eficiência.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<p>
									Tutoriais e demonstrações rápidas para testar, isolar e agilizar
									processos no mainframe usando o Eccox APT.
								</p>
								<Button asChild variant="outline" className="w-full">
									<Link href="/docs/guia-video">
										<span>Assistir Agora</span>
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
										href="https://github.com/eccox-docs/eccox-apt-docs"
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
