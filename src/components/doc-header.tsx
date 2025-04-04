"use client";

import { Github } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";

import { LogoSection } from "./logo-section";
import { Button } from "./ui/button";

interface DocHeaderProps {
	children?: React.ReactNode;
}

export function DocHeader({ children }: DocHeaderProps) {
	const { theme, systemTheme } = useTheme();
	const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		if (theme === "system") {
			setResolvedTheme(systemTheme === "dark" ? "dark" : "light");
		} else {
			setResolvedTheme(theme === "dark" ? "dark" : "light");
		}
	}, [theme, systemTheme]);

	return (
		<header className="sticky top-0 z-50 w-screen transition-all duration-200 border-b bg-white/80 backdrop-blur-lg dark:bg-background/80">
			<div className="flex h-14 items-center justify-between w-full px-4 md:px-6">
				<div className="flex items-center gap-4">
					<LogoSection resolvedTheme={resolvedTheme} />
				</div>

				<div className="flex flex-1 items-center justify-center max-w-md mx-auto">
					{children}
				</div>
				<div className="flex items-center gap-2">
					<div className="hidden md:flex items-center space-x-1">
						<Button variant="ghost" size="sm" asChild>
							<div>
								<Image
									src="/images/Logotipo_600x550.v2.png"
									alt="Logo"
									width={16}
									height={16}
								/>
								<Link href="https://www.eccox.com/pt">Eccox</Link>
							</div>
						</Button>
					</div>
					<Button variant="ghost" size="icon" asChild>
						<a
							href="https://github.com/seu-usuario/apt-docs"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Github className="h-5 w-5" />
							<span className="sr-only">GitHub</span>
						</a>
					</Button>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
