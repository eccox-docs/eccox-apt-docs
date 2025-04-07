import { LogoSection } from "../logo-section";
import type { SidebarHeaderProps } from "./types";

/**
 * Cabeçalho da sidebar com logo e informações (visível apenas em mobile)
 */
export function SidebarHeader({ resolvedTheme }: SidebarHeaderProps) {
	return (
		<div className="flex items-center justify-between px-4 h-[57px] border-b border-border lg:hidden">
			<LogoSection resolvedTheme={resolvedTheme} />
		</div>
	);
}
