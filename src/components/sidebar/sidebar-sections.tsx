import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ReactNode } from "react";
import { navigationConfig } from "./navigation-config";
import { SectionItem } from "./section-item";
import type { RenderNavItemFunction, SidebarSectionsProps } from "./types";

/**
 * Componente para renderizar as seções da sidebar
 */
export function SidebarSections({
	activeCategory,
	expandedItems,
	toggleExpanded,
	isActive,
	toggleSidebar,
}: SidebarSectionsProps) {
	// Função utilitária para renderizar links ou botões
	const renderNavItem: RenderNavItemFunction = (href, onClick, children) => {
		if (href === "#") {
			return (
				<button
					type="button"
					onClick={onClick}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							onClick();
						}
					}}
					className="w-full cursor-pointer"
					aria-label="Item de navegação"
				>
					{children}
				</button>
			);
		}

		return (
			<Link href={href} onClick={onClick}>
				{children}
			</Link>
		);
	};

	// Encontra a categoria ativa
	const activeSection = navigationConfig.categories.find(
		(cat) => cat.id === activeCategory,
	);

	if (!activeSection) return null;

	return (
		<div className="flex-1 overflow-hidden">
			<ScrollArea className="h-full px-4 pb-4">
				<div className="space-y-1">
					{activeSection.sections.map((section) => (
						<SectionItem
							key={section.href}
							section={section}
							expandedItems={expandedItems}
							toggleExpanded={toggleExpanded}
							isActive={isActive}
							toggleSidebar={toggleSidebar}
							renderNavItem={renderNavItem}
						/>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
