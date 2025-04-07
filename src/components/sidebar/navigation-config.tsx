import type { NavigationCategory } from "./types";

import {
	BookMarked,
	BookOpen,
	Boxes,
	Code,
	Combine,
	Database,
	FileText,
	Footprints,
	GraduationCap,
	Hand,
	Home,
	Laptop,
	ListTodo,
	PenTool,
	Server,
	Settings,
	Shield,
	Video,
} from "lucide-react";

/**
 * Definição das categorias e suas seções para a navegação
 * Cada categoria possui um ID, título, link (href), ícone e seções
 * As seções podem ter filhos que podem ser expandidos para mostrar mais opções
 * exemplos da estrutura de navegação
 * categories > sections > children > children
 */

const categories: NavigationCategory[] = [
	{
		id: "home",
		title: "Início",
		href: "/",
		icon: <Home className="h-4 w-4" />,
		sections: [], // Home não possui seções específicas
	},
	// Categoria de manuais
	{
		id: "manuais",
		title: "Guia de Utilização",
		href: "/docs/manual",
		icon: <BookOpen className="h-4 w-4" />,
		sections: [
			{
				title: "Bem-vindo",
				href: "/docs/manual",
				icon: (
					<Hand
						className="h-4 w-4"
						style={{ transform: "rotate(-40deg) scaleX(-1)" }}
					/>
				),
			},
			{
				title: "Acesso e Navegação",
				href: "/docs/acesso",
				icon: <Laptop className="h-4 w-4" />,
				children: [
					{
						title: "Login",
						href: "/docs/manual/acesso/login",
					},
					{ title: "Navegação Web", href: "/docs/manual/acesso/navegacao" },
				],
			},
			{
				title: "Criação de Container",
				href: "/docs/container-criacao",
				icon: <Boxes className="h-4 w-4" />,
				children: [
					{
						title: "Criar Container",
						href: "/docs/manual/container-criacao/criacao",
					},
					{
						title: "Criar Plano de Teste",
						href: "/docs/manual/container-criacao/plano",
					},
				],
			},
			{
				title: "Lista de Containers",
				href: "/docs/container-lista",
				icon: <ListTodo className="h-4 w-4" />,
				children: [
					{
						title: "Visualizar e Editar",
						href: "/docs/manual/container-lista/editar",
					},
					{
						title: "Ações em Containers",
						href: "/docs/manual/container-lista/acoes",
					},
					{
						title: "Duplicar ou Remover",
						href: "/docs/manual/container-lista/duplicar-remover",
					},
					{
						title: "Ativar com Erro",
						href: "/docs/manual/container-lista/ativar-erro",
					},
				],
			},
			{
				title: "Gerenciar Componentes",
				href: "/docs/componentes",
				icon: <Database className="h-4 w-4" />,
				children: [
					{
						title: "Adicionar Componentes",
						href: "/docs/manual/componentes/adicionar",
					},
					{
						title: "Serviços Buscadores",
						href: "/docs/manual/componentes/buscadores",
					},
					{
						title: "Selecionar Componentes",
						href: "/docs/manual/componentes/selecionar",
					},
					{
						title: "Reprocessar Serviços",
						href: "/docs/manual/componentes/reprocessar",
					},
					{ title: "Exportar Logs", href: "/docs/manual/componentes/logs" },
				],
			},
			{
				title: "Gerenciar Containers",
				href: "/docs/container-gerenciar",
				icon: <Combine className="h-4 w-4" />,
				children: [
					{
						title: "Ações em Componentes",
						href: "/docs/manual/container-gerenciar/acoes",
					},
					{
						title: "Carga Inicial",
						href: "/docs/manual/container-gerenciar/carga-inicial",
					},
					{
						title: "Executar Processamento",
						href: "/docs/manual/container-gerenciar/processamento",
					},
					{
						title: "Identificar Clonados",
						href: "/docs/manual/container-gerenciar/identificar",
					},
					{
						title: "Critério de Redução",
						href: "/docs/manual/container-gerenciar/reducao",
					},
					{
						title: "Alter Table - Adicionar",
						href: "/docs/manual/container-gerenciar/alter-add",
					},
					{
						title: "Alter Table - Remover",
						href: "/docs/manual/container-gerenciar/alter-remove",
					},
					{
						title: "Ver Logs",
						href: "/docs/manual/container-gerenciar/logs",
					},
					{
						title: "Identificador Único",
						href: "/docs/manual/container-gerenciar/unique-id",
					},
					{
						title: "Snapshots",
						href: "/docs/manual/container-gerenciar/snapshots",
					},
					{
						title: "Mover Dados",
						href: "/docs/manual/container-gerenciar/data-mover",
					},
				],
			},
			{
				title: "Configuração",
				href: "/docs/configuracao",
				icon: <Settings className="h-4 w-4" />,
				children: [
					{
						title: "Regras de Identificação",
						href: "/docs/manual/configuracao/regras",
					},
					{ title: "Aplicações", href: "/docs/manual/configuracao/aplicacoes" },
					{ title: "Alertas", href: "/docs/manual/configuracao/alertas" },
				],
			},
			{
				title: "Segurança",
				href: "/docs/seguranca",
				icon: <Shield className="h-4 w-4" />,
				children: [
					{ title: "Perfis", href: "/docs/manual/seguranca/perfis" },
					{ title: "Usuários", href: "/docs/manual/seguranca/usuarios" },
				],
			},
			{
				title: "Administração",
				href: "/docs/admin",
				icon: <Server className="h-4 w-4" />,
				children: [
					{
						title: "Identificadores Ativos",
						href: "/docs/manual/administracao/identificadores",
					},
					{
						title: "Relatórios",
						href: "/docs/manual/administracao/relatorios",
					},
					{ title: "Dashboard", href: "/docs/manual/administracao/dashboard" },
				],
			},
			{
				title: "Traces",
				href: "/docs/traces",
				icon: <Footprints className="h-4 w-4" />,
				children: [
					{ title: "CICS Trace", href: "/docs/manual/traces/cics" },
					{ title: "IMS Trace", href: "/docs/manual/traces/ims" },
				],
			},
			{
				title: "MQ para z/OS",
				href: "/docs/mq",
				icon: <FileText className="h-4 w-4" />,
				children: [
					{
						title: "Uso em Filas IBM MQ",
						href: "/docs/manual/mq/uso",
					},
				],
			},
		],
	},
	// Categoria de Aprendizado
	{
		id: "aprenda",
		title: "Aprenda",
		href: "/docs/aprenda",
		icon: <GraduationCap className="h-4 w-4" />,
		sections: [
			{
				title: "Fundamentos",
				href: "/docs/aprenda/fundamentos",
				icon: <BookMarked className="h-4 w-4" />,
				children: [
					{
						title: "Conceitos básicos",
						href: "/docs/aprenda/fundamentos/conceitos-basicos",
					},
					{
						title: "Arquitetura",
						href: "/docs/aprenda/fundamentos/arquitetura",
					},
					{
						title: "Modelos de dados",
						href: "/docs/aprenda/fundamentos/modelos-de-dados",
					},
				],
			},
			{
				title: "Tutoriais",
				href: "/docs/aprenda/tutoriais",
				icon: <PenTool className="h-4 w-4" />,
				children: [
					{
						title: "Projeto para iniciantes",
						href: "/docs/aprenda/tutoriais/iniciantes",
					},
					{
						title: "Aplicação intermediária",
						href: "/docs/aprenda/tutoriais/intermediario",
					},
					{
						title: "Projeto avançado",
						href: "/docs/aprenda/tutoriais/avancado",
					},
				],
			},
			{
				title: "Vídeo aulas",
				href: "/docs/aprenda/videos",
				icon: <Video className="h-4 w-4" />,
				children: [
					{ title: "Introdução", href: "/docs/aprenda/videos/introduction" },
					{
						title: "Desenvolvimento",
						href: "/docs/aprenda/videos/development",
					},
					{ title: "Casos de uso", href: "/docs/aprenda/videos/case-studies" },
				],
			},
			{
				title: "Exercícios práticos",
				href: "/docs/aprenda/exercicios",
				icon: <Code className="h-4 w-4" />,
				children: [
					{
						title: "Nível iniciante",
						href: "/docs/aprenda/exercicios/beginner",
					},
					{
						title: "Nível intermediário",
						href: "/docs/aprenda/exercicios/intermediate",
					},
					{
						title: "Nível avançado",
						href: "/docs/aprenda/exercicios/advanced",
					},
				],
			},
		],
	},
];

export const navigationConfig = {
	categories,
};
