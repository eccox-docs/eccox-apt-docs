"use client";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MobileOverlay } from "./mobile-overlay";
import { navigationConfig } from "./navigation-config";
import { SidebarHeader } from "./sidebar-header";
import { SidebarSections } from "./sidebar-sections";
import { SidebarTopContent } from "./sidebar-top-content";
import type { SidebarNavProps } from "./types";

/**
 * Componente SidebarNav responsável pela navegação lateral
 */
export function SidebarNav({ isOpen, toggleSidebar }: SidebarNavProps) {
	const pathname = usePathname();
	const { resolvedTheme } = useTheme();
	const {
		expandedItems,
		activeCategory,
		setActiveCategory,
		setInitialStates,
		toggleExpanded,
		isActive,
	} = useSidebarStore();

	// Inicializa os estados ao montar o componente ou quando a rota muda
	useEffect(() => {
		setInitialStates(pathname, navigationConfig);
	}, [pathname, setInitialStates]);

	return (
		<>
			{/* Overlay para mobile */}
			<MobileOverlay isOpen={isOpen} toggleSidebar={toggleSidebar} />

			{/* Container principal da sidebar */}
			<div
				className={cn(
					"fixed left-0 top-0 w-[290px] h-full bg-[#f8f9fa] dark:bg-card border-r border-border z-50 flex flex-col shadow-lg transition-transform",
					isOpen ? "translate-x-0" : "-translate-x-full",
					"lg:translate-x-0 lg:relative lg:top-0 lg:h-[calc(100vh-3.6rem)]",
				)}
			>
				{/* Cabeçalho da sidebar (apenas para mobile) */}
				<SidebarHeader resolvedTheme={resolvedTheme} />

				{/* Conteúdo superior da sidebar (pesquisa e categorias) */}
				<SidebarTopContent
					activeCategory={activeCategory}
					setActiveCategory={setActiveCategory}
					toggleSidebar={toggleSidebar}
				/>

				{/* Seções da navegação */}
				<SidebarSections
					activeCategory={activeCategory}
					expandedItems={expandedItems}
					toggleExpanded={toggleExpanded}
					isActive={isActive}
					toggleSidebar={toggleSidebar}
				/>
			</div>
		</>
	);
}
