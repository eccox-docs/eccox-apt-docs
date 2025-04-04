import type { MobileOverlayProps } from "./types";

/**
 * Overlay para fechar a sidebar em dispositivos móveis
 */
export function MobileOverlay({ isOpen, toggleSidebar }: MobileOverlayProps) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 z-40 lg:hidden"
			onClick={toggleSidebar}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					toggleSidebar();
				}
			}}
			tabIndex={0}
			role="button"
			aria-label="Fechar menu"
		/>
	);
}
