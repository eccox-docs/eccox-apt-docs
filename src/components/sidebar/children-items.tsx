import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { GrandchildrenItems } from "./grandchildren-items";
import type { ChildrenItemsProps } from "./types";

/**
 * Renderiza os itens filhos de uma seção
 */
export function ChildrenItems({
	children,
	expandedItems,
	toggleExpanded,
	isActive,
	toggleSidebar,
	renderNavItem,
}: ChildrenItemsProps) {
	return (
		<div className="relative pl-4 mt-2 space-y-1 section-transition">
			{/* Linha vertical */}
			<Separator className="absolute top-0 bottom-2 left-2 w-[1px] bg-border" />

			{children.map((child) => (
				<div key={child.href}>
					{renderNavItem(
						child.href,
						() => {
							if (window.innerWidth < 1024) toggleSidebar();
							if (child.href === "#" && child.children) {
								toggleExpanded(child.href);
							}
						},
						<Button
							variant={isActive(child.href) ? "secondary" : "ghost"}
							className={cn(
								"w-full justify-start pl-6 cursor-pointer",
								isActive(child.href)
									? "bg-primary/10 text-primary hover:bg-primary/15"
									: "hover:bg-primary/5 hover:text-primary text-sm font-normal",
							)}
						>
							{child.title}
						</Button>,
					)}

					{/* Renderiza netos se existirem e o pai estiver expandido */}
					{expandedItems.includes(child.href) && child.children && (
						<GrandchildrenItems
							grandchildren={child.children}
							isActive={isActive}
							toggleSidebar={toggleSidebar}
							renderNavItem={renderNavItem}
						/>
					)}
				</div>
			))}
		</div>
	);
}
