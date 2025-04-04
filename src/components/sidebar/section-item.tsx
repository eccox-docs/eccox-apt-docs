import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { ChildrenItems } from "./children-items";
import type { SectionItemProps } from "./types";

/**
 * Item de seção na navegação
 */
export function SectionItem({
	section,
	expandedItems,
	toggleExpanded,
	isActive,
	toggleSidebar,
	renderNavItem,
}: SectionItemProps) {
	// Renderiza uma seção que pode ter filhos
	if (section.children) {
		return (
			<div>
				<Button
					variant={isActive(section.href) ? "secondary" : "ghost"}
					className={cn(
						"w-full justify-between cursor-pointer",
						isActive(section.href)
							? "bg-primary/10 text-primary hover:bg-primary/15"
							: "hover:bg-white hover:text-foreground",
					)}
					onClick={() => toggleExpanded(section.href)}
				>
					<div className="flex items-center">
						{section.icon && <span className="mr-2">{section.icon}</span>}
						<span>{section.title}</span>
					</div>
					<ChevronDown
						className={cn(
							"h-4 w-4 transition-transform",
							expandedItems.includes(section.href) ? "rotate-180" : "",
						)}
					/>
				</Button>

				{/* Renderiza os filhos se a seção estiver expandida */}
				{expandedItems.includes(section.href) && (
					<ChildrenItems
						expandedItems={expandedItems}
						toggleExpanded={toggleExpanded}
						isActive={isActive}
						toggleSidebar={toggleSidebar}
						renderNavItem={renderNavItem}
					>
						{section.children}
					</ChildrenItems>
				)}
			</div>
		);
	}

	// Renderiza uma seção simples sem filhos
	return (
		<div>
			{renderNavItem(
				section.href,
				() => {
					if (window.innerWidth < 1024) toggleSidebar();
				},
				<Button
					variant={isActive(section.href) ? "secondary" : "ghost"}
					className={cn(
						"w-full justify-start cursor-pointer p-0",
						isActive(section.href)
							? "bg-primary/10 text-primary hover:bg-primary/15"
							: "hover:bg-white hover:text-foreground",
					)}
				>
					<div className="flex items-center pl-3">
						{section.icon && <span className="mr-2">{section.icon}</span>}
						<span>{section.title}</span>
					</div>
				</Button>,
			)}
		</div>
	);
}
