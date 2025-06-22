import { cn } from "@/lib/utils";
import { getPath } from "@/utils/get-path";
import { BookOpen } from "lucide-react";
import { PiBookOpenUserBold } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";

interface LogoSectionProps {
	resolvedTheme?: string;
	showDocIndicator?: boolean;
	version?: string;
	className?: string;
	logoSize?: number;
	iconSize?: number;
	asLink?: boolean;
}

/**
 * Componente reutilizável para exibir o logo da APT com opções de personalização
 *
 * @param resolvedTheme - Tema atual para determinar qual versão do logo usar
 * @param showDocIndicator - Se deve mostrar o indicador de documentação
 * @param version - Versão para exibir (opcional)
 * @param className - Classes adicionais para o container
 * @param logoSize - Tamanho do logo em pixels
 * @param iconSize - Tamanho do ícone de documentação em pixels
 * @param asLink - Se deve renderizar como link para a página inicial
 */
export function LogoSection({
	resolvedTheme,
	showDocIndicator = true,
	version = "v2.0.7.5",
	className = "",
	logoSize = 16,
	iconSize = 16,
	asLink = true,
}: LogoSectionProps) {
	// Conteúdo do componente
	const content = (
		<div className={cn("flex items-center gap-4 p-1.5", className)}>
			{/* Logo e versão */}
			<div className="flex items-center justify-center gap-2">
				<div className="relative">
					{/* Logo para tema claro */}
					<Image
						src={getPath("/images/APT_Black.png")}
						alt="Logo Light"
						width={logoSize}
						height={logoSize}
						className="block dark:hidden"
						priority
					/>

					{/* Logo para tema escuro */}
					<Image
						src={getPath("/images/APT_BW.png")}
						alt="Logo Dark"
						width={logoSize}
						height={logoSize}
						className="hidden dark:block"
						priority
					/>
				</div>
				<span className="text-2xl font-bold">APT</span>
				{version && (
					<span className="text-sm font-medium text-muted-foreground ml-1">
						{version}
					</span>
				)}
			</div>

			{/* Indicador de documentação - renderizado apenas se showDocIndicator for true */}
			{showDocIndicator && (
				<div className="flex items-center justify-center gap-2">
					{/* <div className="flex size-6 items-center justify-center rounded-[4px] border bg-primary/15">
						<Image
							src={getPath("/images/IconDocumentation.svg")}
							alt="Ícone de Documentação"
							width={iconSize}
							height={iconSize}
						/>
						<BookOpen className="h-4 w-4 text-muted-foreground stroke-blue-500" />
					</div> */}
					<div className="flex gap-1 items-center justify-center  ">
					
						<PiBookOpenUserBold 
						 color=""
						 />

				    <span className="text-sm font-semibold">Docs</span>
					</div>
				</div>
			)}
		</div>
	);

	// Renderiza como link ou div com base na prop asLink
	if (asLink) {
		return (
			<Link href="/" className="flex items-center space-x-2">
				{content}
			</Link>
		);
	}

	return content;
}
