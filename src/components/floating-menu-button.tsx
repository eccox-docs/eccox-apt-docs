"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface FloatingMenuButtonProps {
	toggleSidebar: () => void;
}

export function FloatingMenuButton({ toggleSidebar }: FloatingMenuButtonProps) {
	return (
		<Button
			variant="default"
			className="fixed bottom-6 left-6 z-[9999] bg-primary/10 text-primary hover:bg-primary/30  p-3 rounded-full shadow-lg lg:hidden"
			onClick={toggleSidebar}
		>
			<Menu className="w-6 h-6" />
		</Button>
	);
}
