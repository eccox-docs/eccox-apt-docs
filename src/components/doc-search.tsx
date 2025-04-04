"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";

export function DocSearch() {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	// Simulação de resultados de pesquisa
	// Em uma implementação real, isso viria de uma API ou indexação de conteúdo
	const searchResults = [
		{
			title: "Introdução",
			path: "/docs/getting-started",
			section: "Guias",
		},
		{
			title: "Instalação",
			path: "/docs/guides/installation",
			section: "Guias",
		},
		{
			title: "Configuração",
			path: "/docs/guides/configuration",
			section: "Guias",
		},
		{
			title: "API Overview",
			path: "/docs/api/overview",
			section: "API",
		},
		{
			title: "CLI Reference",
			path: "/docs/reference/cli",
			section: "Referência",
		},
	];

	return (
		<>
			<Button
				variant="outline"
				className="relative hover:bg-primary/5 hover:text-foreground h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none"
				onClick={() => setOpen(true)}
			>
				<span className="inline-flex">Pesquisar...</span>
				<kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Digite para pesquisar..." />
				<CommandList>
					<CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
					<CommandGroup heading="Guias">
						{searchResults
							.filter((item) => item.section === "Guias")
							.map((item) => (
								<CommandItem
									key={item.path}
									onSelect={() => {
										router.push(item.path);
										setOpen(false);
									}}
									className="cursor-pointer"
								>
									<Search className="mr-2 h-4 w-4" />
									{item.title}
								</CommandItem>
							))}
					</CommandGroup>
					<CommandGroup heading="API">
						{searchResults
							.filter((item) => item.section === "API")
							.map((item) => (
								<CommandItem
									key={item.path}
									onSelect={() => {
										router.push(item.path);
										setOpen(false);
									}}
								>
									<Search className="mr-2 h-4 w-4" />
									{item.title}
								</CommandItem>
							))}
					</CommandGroup>
					<CommandGroup heading="Referência">
						{searchResults
							.filter((item) => item.section === "Referência")
							.map((item) => (
								<CommandItem
									key={item.path}
									onSelect={() => {
										router.push(item.path);
										setOpen(false);
									}}
								>
									<Search className="mr-2 h-4 w-4" />
									{item.title}
								</CommandItem>
							))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}
