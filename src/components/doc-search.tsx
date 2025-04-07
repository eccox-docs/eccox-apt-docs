"use client";

import { FileSearch, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { navigationConfig } from "./sidebar/navigation-config";
import { Button } from "./ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";

// Define o tipo para um resultado de pesquisa
type SearchResult = {
	title: string;
	path: string;
	category: string;
	section?: string;
	level: number; // 0 = categoria, 1 = seção, 2 = item filho, 3 = subitem
	relevance: number; // Pontuação de relevância para melhorar a ordenação
};

export function DocSearch() {
	const [open, setOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const router = useRouter();

	// Função para extrair todos os itens navegáveis da configuração de navegação
	const extractSearchItems = (): SearchResult[] => {
		const results: SearchResult[] = [];

		for (const category of navigationConfig.categories) {
			// Adiciona a categoria principal
			results.push({
				title: category.title,
				path: category.href,
				category: category.title,
				level: 0,
				relevance: 0,
			});

			// Adiciona as seções da categoria
			for (const section of category.sections) {
				results.push({
					title: section.title,
					path: section.href,
					category: category.title,
					section: section.title,
					level: 1,
					relevance: 0,
				});

				// Se a seção tiver filhos, adiciona-os também
				if (section.children) {
					for (const child of section.children) {
						results.push({
							title: child.title,
							path: child.href,
							category: category.title,
							section: section.title,
							level: 2,
							relevance: 0,
						});

						// Se o filho tiver subfilhos (caso existam), adiciona-os também
						if (child.children) {
							for (const subChild of child.children) {
								results.push({
									title: subChild.title,
									path: subChild.href,
									category: category.title,
									section: section.title,
									level: 3,
									relevance: 0,
								});
							}
						}
					}
				}
			}
		}

		return results;
	};

	// Função auxiliar para calcular a pontuação de relevância para cada item
	const calculateRelevance = (item: SearchResult, query: string): number => {
		const queryLower = query.toLowerCase().trim();
		const queryWords = queryLower.split(/\s+/);
		const titleLower = item.title.toLowerCase();
		const titleWords = titleLower.split(/\s+/);
		const sectionLower = item.section?.toLowerCase() || "";
		const sectionWords = sectionLower.split(/\s+/);
		const categoryLower = item.category.toLowerCase();
		const categoryWords = categoryLower.split(/\s+/);

		let score = 0;

		// Correspondência exata no título (prioridade mais alta)
		if (titleLower === queryLower) {
			score += 1000;
		}
		// Título começa com a consulta
		else if (titleLower.startsWith(queryLower)) {
			score += 500;
		}
		// Consulta está contida no título
		else if (titleLower.includes(queryLower)) {
			score += 400;
		}

		// Correspondência por palavras individuais no título
		for (const queryWord of queryWords) {
			// Palavra exata encontrada no título
			if (titleWords.some((word) => word === queryWord)) {
				score += 200;
			}
			// Título contém palavra que começa com a consulta
			else if (titleWords.some((word) => word.startsWith(queryWord))) {
				score += 150;
			}
			// Título contém palavra que inclui a consulta
			else if (titleWords.some((word) => word.includes(queryWord))) {
				score += 100;
			}
		}

		// Correspondências em seção
		if (sectionLower === queryLower) {
			score += 80;
		} else if (sectionLower.includes(queryLower)) {
			score += 60;
		}

		// Correspondência por palavras individuais na seção
		for (const queryWord of queryWords) {
			// Palavra exata encontrada na seção
			if (sectionWords.some((word) => word === queryWord)) {
				score += 50;
			}
			// Seção contém palavra que começa com a consulta
			else if (sectionWords.some((word) => word.startsWith(queryWord))) {
				score += 40;
			}
			// Seção contém palavra que inclui a consulta
			else if (sectionWords.some((word) => word.includes(queryWord))) {
				score += 30;
			}
		}

		// Correspondências na categoria
		if (categoryLower === queryLower) {
			score += 20;
		} else if (categoryLower.includes(queryLower)) {
			score += 10;
		}

		// Correspondência por palavras individuais na categoria
		for (const queryWord of queryWords) {
			if (
				categoryWords.some(
					(word) =>
						word === queryWord ||
						word.startsWith(queryWord) ||
						word.includes(queryWord),
				)
			) {
				score += 5;
			}
		}

		// Bônus para itens dentro de uma seção relevante
		// Isso ajudará nos casos como "Regras de Identificação"
		if (
			(sectionLower.includes(queryLower) ||
				sectionWords.some((word) =>
					queryWords.some((qw) => word.includes(qw)),
				)) &&
			item.level > 1
		) {
			score += 120;
		}

		// Bônus para palavras próximas ("plano" e "teste")
		// Ajudará em casos como "Novo Plano de Teste"
		if (queryWords.length > 1) {
			const allItemText = `${titleLower} ${sectionLower} ${categoryLower}`;
			const allWordsPresent = queryWords.every((qw) =>
				allItemText.includes(qw),
			);
			if (allWordsPresent) {
				score += 300;
			}
		}

		// Pontuação extra para itens com nível mais profundo (filhos ou subfilhos)
		if (item.level === 2) {
			score += 10;
		} else if (item.level === 3) {
			score += 5;
		}

		return score;
	};

	// Todos os itens disponíveis para pesquisa
	const allSearchItems = extractSearchItems();

	// Filtra e prioriza os resultados com base na consulta de pesquisa
	const filterAndPrioritizeResults = (items: SearchResult[], query: string) => {
		if (!query.trim()) return [];

		// Palavras da consulta para correspondência parcial
		const queryWords = query
			.toLowerCase()
			.trim()
			.split(/\s+/)
			.filter((word) => word.length > 0);

		if (queryWords.length === 0) return [];

		// Filtra itens que correspondem a pelo menos uma palavra da consulta
		const filtered = items.filter((item) => {
			const titleLower = item.title.toLowerCase();
			const sectionLower = item.section?.toLowerCase() || "";
			const categoryLower = item.category.toLowerCase();
			const allText = `${titleLower} ${sectionLower} ${categoryLower}`;

			// Verifica se pelo menos uma das palavras da consulta está presente em algum lugar
			return queryWords.some(
				(word) =>
					allText.includes(word) ||
					// Também corresponde a palavras que começam com a consulta parcial (ex: "Identi" corresponde a "Identificação")
					titleLower
						.split(/\s+/)
						.some((titleWord) => titleWord.startsWith(word)) ||
					sectionLower
						.split(/\s+/)
						.some((sectionWord) => sectionWord.startsWith(word)) ||
					categoryLower
						.split(/\s+/)
						.some((categoryWord) => categoryWord.startsWith(word)),
			);
		});

		// Calcula pontuação de relevância para cada item
		const scored = filtered.map((item) => {
			const relevance = calculateRelevance(item, query);
			return { ...item, relevance };
		});

		// Ordena por relevância (pontuação mais alta primeiro)
		return scored.sort((a, b) => b.relevance - a.relevance);
	};

	// Resultados filtrados e priorizados
	const filteredResults = filterAndPrioritizeResults(
		allSearchItems,
		searchQuery,
	);

	// Agrupa os resultados por categoria
	const groupedResults = filteredResults.reduce(
		(acc, item) => {
			if (!acc[item.category]) {
				acc[item.category] = [];
			}
			acc[item.category].push(item);
			return acc;
		},
		{} as Record<string, SearchResult[]>,
	);

	// Limita o número de resultados por categoria
	const limitResultsPerCategory = (
		results: Record<string, SearchResult[]>,
		limit = 5,
	) => {
		const limited: Record<string, SearchResult[]> = {};
		for (const category of Object.keys(results)) {
			limited[category] = results[category].slice(0, limit);
		}
		return limited;
	};

	const limitedResults = limitResultsPerCategory(groupedResults);

	return (
		<>
			<Button
				variant="outline"
				className="relative hover:bg-primary/5 hover:text-foreground h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none"
				onClick={() => setOpen(true)}
			>
				<span className="inline-flex">Pesquisar...</span>
				<kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1  px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
					<Search className="h-4 w-4" />
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					placeholder="Digite para pesquisar..."
					value={searchQuery}
					onValueChange={setSearchQuery}
				/>
				<CommandList>
					<CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

					{Object.keys(limitedResults).map((category) => (
						<CommandGroup key={category} heading={category}>
							{limitedResults[category].map((item) => (
								<CommandItem
									key={item.path}
									onSelect={() => {
										router.push(item.path);
										setOpen(false);
										setSearchQuery("");
									}}
									className="cursor-pointer"
								>
									<Search className="mr-2 h-4 w-4" />
									<span className="flex-1 overflow-hidden">
										{item.title}
										{item.section && item.level > 1 && (
											<span className="ml-2 text-xs text-muted-foreground">
												em {item.section}
											</span>
										)}
									</span>
								</CommandItem>
							))}
						</CommandGroup>
					))}
				</CommandList>
			</CommandDialog>
		</>
	);
}
