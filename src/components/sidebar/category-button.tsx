import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { CategoryButtonProps } from "./types";

/**
 * Botão de categoria na sidebar
 */
export function CategoryButton({
	category,
	isActive,
	onClick,
}: CategoryButtonProps) {
	const renderItem = () => {
		// Renderiza o conteúdo do botão
		return (
			<Button
				variant={isActive ? "secondary" : "ghost"}
				className={cn(
					"w-full justify-start text-base cursor-pointer group",
					isActive
						? "bg-primary/10 border border-border rounded-[8px] text-foreground hover:bg-primary/15"
						: "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
				)}
			>
				{category.icon && (
					<span
						className={cn(
							"mr-2 transition-colors",
							isActive
								? "text-primary"
								: "text-muted-foreground group-hover:text-foreground",
						)}
					>
						{category.icon}
					</span>
				)}
				<span>{category.title}</span>
			</Button>
		);
	};

	// Decide se deve renderizar como link ou botão
	if (category.href === "#") {
		return (
			<button
				type="button"
				onClick={onClick}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						onClick();
					}
				}}
				className="w-full cursor-pointer"
				aria-label={`Categoria ${category.title}`}
			>
				{renderItem()}
			</button>
		);
	}

	return (
		<Link href={category.href} onClick={onClick}>
			{renderItem()}
		</Link>
	);
}
