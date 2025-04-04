"use client";

import type React from "react";

import { Menu } from "lucide-react";
import { useState } from "react";
import { DocHeader } from "./doc-header";
import { FloatingMenuButton } from "./floating-menu-button";
import { SidebarNav } from "./sidebar";

interface DocLayoutProps {
	children: React.ReactNode;
}

export function DocLayout({ children }: DocLayoutProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

	return (
		<div className="flex flex-col h-screen">
			{/* Header fixo no topo */}
			<DocHeader />

			{/* Conteúdo principal e sidebar */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar para desktop (visível por padrão) */}
				<aside className="hidden lg:block w-[280px] flex-shrink-0">
					<SidebarNav isOpen={true} toggleSidebar={toggleSidebar} />
				</aside>

				{/* Sidebar para dispositivos móveis (controlado pelo estado) */}
				<div className="lg:hidden">
					<SidebarNav isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				</div>

				{/* Conteúdo principal com scroll próprio */}
				<main className="flex-1 overflow-y-auto w-full ">
					<div className="mx-auto w-full max-w-screen-xl pb-6 px-6 ">
						{children}
					</div>
				</main>
			</div>

			{/* Botão flutuante */}
			<FloatingMenuButton toggleSidebar={toggleSidebar} />
		</div>
	);
}
