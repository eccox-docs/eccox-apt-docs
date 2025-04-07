import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
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

			{children.map((child, index) => {
				// Cria uma chave única usando índice como fallback
				const itemKey = `${child.href}-${index}`;

				// Determina se este item deve redirecionar ou apenas expandir/colapsar
				const handleClick = () => {
					if (window.innerWidth < 1024) toggleSidebar();

					// Se tiver filhos (netos do item original), apenas expande/colapsa
					if (child.children?.length) {
						toggleExpanded(child.href);
					}
				};

				return (
					<div key={itemKey}>
						{renderNavItem(
							// Se tiver filhos, use "#" como href para prevenir navegação
							child.children?.length ? "#" : child.href,
							handleClick,
							<Button
								variant={isActive(child.href) ? "secondary" : "ghost"}
								className={cn(
									"w-full justify-start pl-6 cursor-pointer",
									isActive(child.href)
										? "bg-primary/10 text-primary hover:bg-primary/15"
										: "hover:bg-primary/5 hover:text-primary text-sm font-normal ",
								)}
							>
								<div className="flex items-center w-full ">
									{child.title}
									{(child.children?.length ?? 0) > 0 && (
										<ChevronDown
											size={16}
											className={cn(
												"h-4 w-4 transition-transform ml-auto text-muted-foreground",
												expandedItems.includes(child.href) ? "rotate-180" : "",
											)}
										/>
									)}
								</div>
							</Button>,
						)}

						{/* Renderiza netos se existirem e o pai estiver expandido */}
						{expandedItems.includes(child.href) && child.children && (
							<GrandchildrenItems
								grandchildren={child.children}
								isActive={isActive}
								toggleSidebar={toggleSidebar}
								renderNavItem={renderNavItem}
								expandedItems={expandedItems}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}
