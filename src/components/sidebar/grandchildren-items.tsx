import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";
import type { GrandchildrenItemsProps } from "./types";

/**
 * Renderiza os itens netos (terceiro nível) na navegação
 */
export function GrandchildrenItems({
	grandchildren,
	isActive,
	toggleSidebar,
	renderNavItem,
}: GrandchildrenItemsProps) {
	return (
		<div className="relative pl-6 mt-1 space-y-1 section-transition">
			{/* Linha vertical para netos */}
			<Separator className="absolute top-0 bottom-2 left-4 w-[1px] bg-border" />

			{grandchildren.map((grandchild) => (
				<div key={grandchild.href}>
					{renderNavItem(
						grandchild.href,
						() => window.innerWidth < 1024 && toggleSidebar(),
						<Button
							variant={isActive(grandchild.href) ? "secondary" : "ghost"}
							className={cn(
								"w-full justify-start pl-2 cursor-pointer",
								isActive(grandchild.href)
									? "bg-primary/10 text-primary hover:bg-primary/15"
									: "hover:bg-primary/5 hover:text-primary text-xs font-normal",
							)}
						>
							{grandchild.title}
						</Button>,
					)}
				</div>
			))}
		</div>
	);
}
