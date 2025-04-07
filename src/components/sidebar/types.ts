import type { ReactNode } from "react";

// Tipos para a navegação
export interface NavigationItem {
	href: string;
	title: string;
	icon?: ReactNode;
	children?: NavigationItem[];
}

export interface NavigationSection {
	href: string;
	title: string;
	icon?: ReactNode;
	children?: NavigationItem[];
}

export interface NavigationCategory {
	id: string;
	title: string;
	href: string;
	icon?: ReactNode;
	sections: NavigationSection[];
}

export interface NavigationConfig {
	categories: NavigationCategory[];
}

// Props compartilhadas
export interface SidebarNavProps {
	isOpen: boolean;
	toggleSidebar: () => void;
}

// Props para componentes internos
export interface MobileOverlayProps {
	isOpen: boolean;
	toggleSidebar: () => void;
}

export interface SidebarHeaderProps {
	resolvedTheme: string | undefined;
}

export interface SidebarTopContentProps {
	activeCategory: string;
	setActiveCategory: (id: string) => void;
	toggleSidebar: () => void;
}

export interface CategoryButtonProps {
	category: NavigationCategory;
	isActive: boolean;
	onClick: () => void;
}

export interface SidebarSectionsProps {
	activeCategory: string;
	expandedItems: string[];
	toggleExpanded: (href: string) => void;
	isActive: (href: string) => boolean;
	toggleSidebar: () => void;
}

export interface SectionItemProps {
	section: NavigationSection;
	expandedItems: string[];
	toggleExpanded: (href: string) => void;
	isActive: (href: string) => boolean;
	toggleSidebar: () => void;
	renderNavItem: (
		href: string,
		onClick: () => void,
		children: ReactNode,
	) => ReactNode;
}

export interface ChildrenItemsProps {
	children: NavigationItem[];
	expandedItems: string[];
	toggleExpanded: (href: string) => void;
	isActive: (href: string) => boolean;
	toggleSidebar: () => void;
	renderNavItem: (
		href: string,
		onClick: () => void,
		children: ReactNode,
	) => ReactNode;
}

export interface GrandchildrenItemsProps {
	grandchildren: NavigationItem[];
	isActive: (href: string) => boolean;
	toggleSidebar: () => void;
	renderNavItem: (
		href: string,
		onClick: () => void,
		children: ReactNode,
	) => ReactNode;
	expandedItems: string[];
}

// Utilitário de renderização de nav item
export type RenderNavItemFunction = (
	href: string,
	onClick: () => void,
	children: ReactNode,
) => ReactNode;
