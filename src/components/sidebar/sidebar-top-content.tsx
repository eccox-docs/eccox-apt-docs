import { DocSearch } from "../doc-search";
import { CategoryButton } from "./category-button";
import { navigationConfig } from "./navigation-config";
import type { SidebarTopContentProps } from "./types";

/**
 * Conteúdo superior da sidebar (pesquisa e categorias)
 */
export function SidebarTopContent({
	activeCategory,
	setActiveCategory,
	toggleSidebar,
}: SidebarTopContentProps) {
	return (
		<div className="px-4 pt-4 flex-shrink-0">
			{/* Barra de pesquisa */}
			<div className="flex items-center mb-4">
				<DocSearch />
			</div>

			{/* Categorias de navegação */}
			<div className="mb-4 bg-secondary rounded-[12px] p-2 flex flex-col gap-2 border border-border">
				{navigationConfig.categories.map((category) => (
					<CategoryButton
						key={category.id}
						category={category}
						isActive={activeCategory === category.id}
						onClick={() => {
							if (window.innerWidth < 1024) toggleSidebar();
							if (category.href === "#") {
								setActiveCategory(category.id);
							}
						}}
					/>
				))}
			</div>
		</div>
	);
}
