import type { NavigationConfig, NavigationItem } from "@/components/sidebar";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
	expandedItems: string[];
	activeCategory: string;
	activePath: string | null;
	setActiveCategory: (category: string) => void;
	toggleExpanded: (itemKey: string) => void;
	setInitialStates: (
		pathname: string,
		navigationConfig: NavigationConfig,
	) => void;
	isActive: (href: string) => boolean;
}

// Função auxiliar para verificar se uma URL faz parte de um caminho
const isPartOfPath = (pathname: string, href: string): boolean => {
	// Ignora href que são "#" ou vazios
	if (href === "#" || href === "") return false;
	return pathname === href || pathname.startsWith(`${href}/`);
};

// Função que verifica se um item ou qualquer um de seus filhos corresponde ao pathname
const isItemOrChildrenActive = (
	item: NavigationItem,
	pathname: string,
): boolean => {
	if (isPartOfPath(pathname, item.href)) return true;

	if (item.children) {
		return item.children.some(
			(child) =>
				isPartOfPath(pathname, child.href) ||
				child.children?.some((grandchild) =>
					isPartOfPath(pathname, grandchild.href),
				),
		);
	}

	return false;
};

export const useSidebarStore = create<SidebarState>()(
	persist(
		(set, get) => ({
			expandedItems: [],
			activeCategory: "home",
			activePath: null,

			setActiveCategory: (category) => set({ activeCategory: category }),

			toggleExpanded: (itemKey) =>
				set((state) => ({
					expandedItems: state.expandedItems.includes(itemKey)
						? state.expandedItems.filter((item) => item !== itemKey)
						: [...state.expandedItems, itemKey],
				})),

			isActive: (href) => {
				const { activePath } = get();
				return activePath === href;
			},

			setInitialStates: (pathname, navigationConfig) => {
				// Define categoria ativa com base na URL
				let newActiveCategory = "home";
				let foundCategory = false;

				// Primeiro, verifica se o pathname corresponde diretamente a uma categoria
				for (const category of navigationConfig.categories) {
					if (isPartOfPath(pathname, category.href)) {
						newActiveCategory = category.id;
						foundCategory = true;
						break;
					}
				}

				// Se não encontrou por href direto, verifica as seções e filhos de cada categoria
				if (!foundCategory) {
					for (const category of navigationConfig.categories) {
						const hasActiveSection = category.sections.some((section) =>
							isItemOrChildrenActive(section, pathname),
						);

						if (hasActiveSection) {
							newActiveCategory = category.id;
							break;
						}
					}
				}

				// Determina quais seções devem ser expandidas com base no pathname
				const currentCategory = navigationConfig.categories.find(
					(cat) => cat.id === newActiveCategory,
				);

				const newExpandedItems: string[] = [];

				if (currentCategory) {
					for (const section of currentCategory.sections) {
						// Expande a seção se ela mesma ou qualquer filho estiver ativo
						if (isItemOrChildrenActive(section, pathname)) {
							// Usa o href como chave, mesmo que seja "#"
							newExpandedItems.push(section.href);

							// Se um filho estiver ativo, identifica qual
							if (section.children) {
								for (const child of section.children) {
									if (isPartOfPath(pathname, child.href)) {
										// Se o filho tiver filhos, também o expande
										if (child.children) {
											newExpandedItems.push(child.href);
										}
									} else if (child.children) {
										// Verifica netos
										for (const grandchild of child.children) {
											if (isPartOfPath(pathname, grandchild.href)) {
												newExpandedItems.push(section.href);
												newExpandedItems.push(child.href);
												break;
											}
										}
									}
								}
							}
						}
					}
				}

				set({
					activeCategory: newActiveCategory,
					expandedItems: newExpandedItems,
					activePath: pathname,
				});
			},
		}),
		{
			name: "sidebar-storage",
			skipHydration: true,
		},
	),
);
