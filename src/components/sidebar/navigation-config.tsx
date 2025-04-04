import type { NavigationCategory } from "./types";

import {
	BookMarked,
	BookOpen,
	Boxes,
	Clock,
	Code,
	Database,
	FileText,
	Footprints,
	GraduationCap,
	HelpCircle,
	Home,
	Laptop,
	Layout,
	PenTool,
	RefreshCw,
	Rocket,
	RocketIcon,
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
	{
		id: "manuais",
		title: "Manual do Sistema",
		href: "/docs/manual",
		icon: <BookOpen className="h-4 w-4" />,
		sections: [
			{
				title: "Introdução",
				href: "/docs/manual",
				icon: <BookMarked className="h-4 w-4" />,
			},
			{
				title: "Acesso ao Sistema",
				href: "/docs/acesso",
				icon: <Laptop className="h-4 w-4" />,
				children: [
					{
						title: "Login",
						href: "/docs/manual/acesso/login",
					},
					{ title: "Navegação", href: "/docs/manual/acesso/navegacao" },
				],
			},
			{
				title: "Containers de Teste",
				href: "/docs/containers",
				icon: <Boxes className="h-4 w-4" />,
				children: [
					{ title: "Criar Container", href: "/docs/containers/criacao" },
					{ title: "Criar Plano de Teste", href: "/docs/containers/plano" },
					{
						title: "Gerenciar Containers",
						href: "/docs/containers/gerenciamento",
					},
					{
						title: "Ativar Containers com Erro",
						href: "/docs/containers/ativar-erro",
					},
				],
			},
			{
				title: "Componentes do Container",
				href: "/docs/componentes",
				icon: <Database className="h-4 w-4" />,
				children: [
					{ title: "Serviços Buscadores", href: "/docs/componentes/servicos" },
					{
						title: "Selecionar Componentes",
						href: "/docs/componentes/selecionar",
					},
					{
						title: "Reprocessar Serviços",
						href: "/docs/componentes/reprocessar",
					},
					{ title: "Exportar Logs", href: "/docs/componentes/logs" },
				],
			},
			{
				title: "Configuração",
				href: "/docs/configuracao",
				icon: <Settings className="h-4 w-4" />,
				children: [
					{
						title: "Regras de Identificação",
						href: "/docs/configuracao/regras",
					},
					{ title: "Aplicações", href: "/docs/configuracao/aplicacoes" },
					{ title: "Alertas", href: "/docs/configuracao/alertas" },
				],
			},
			{
				title: "Segurança",
				href: "/docs/seguranca",
				icon: <Shield className="h-4 w-4" />,
				children: [
					{ title: "Perfis", href: "/docs/seguranca/perfis" },
					{ title: "Usuários", href: "/docs/seguranca/usuarios" },
				],
			},
			{
				title: "Administração",
				href: "/docs/admin",
				icon: <Server className="h-4 w-4" />,
				children: [
					{
						title: "Identificadores Únicos",
						href: "/docs/admin/identificadores",
					},
					{ title: "Relatórios", href: "/docs/admin/relatorios" },
					{ title: "Dashboard", href: "/docs/admin/dashboard" },
				],
			},
			{
				title: "Traces",
				href: "/docs/traces",
				icon: <Footprints className="h-4 w-4" />,
				children: [
					{ title: "CICS Trace", href: "/docs/traces/cics" },
					{ title: "IMS Trace", href: "/docs/traces/ims" },
				],
			},
			{
				title: "Apêndices",
				href: "/docs/apendices",
				icon: <FileText className="h-4 w-4" />,
				children: [
					{
						title: "Uso do APT em filas IBM MQ",
						href: "/docs/apendices/apt-mq",
					},
					{ title: "Bibliografia", href: "/docs/apendices/bibliografia" },
				],
			},
		],
	},
	{
		id: "learn",
		title: "Aprenda",
		href: "/docs/learn",
		icon: <GraduationCap className="h-4 w-4" />,
		sections: [
			{
				title: "Fundamentos",
				href: "/learn/fundamentals",
				icon: <BookOpen className="h-4 w-4" />,
				children: [
					{ title: "Conceitos básicos", href: "/learn/fundamentals/basics" },
					{ title: "Arquitetura", href: "/learn/fundamentals/architecture" },
					{
						title: "Modelos de dados",
						href: "/learn/fundamentals/data-models",
					},
				],
			},
			{
				title: "Tutoriais",
				href: "/learn/tutorials",
				icon: <PenTool className="h-4 w-4" />,
				children: [
					{
						title: "Projeto para iniciantes",
						href: "/learn/tutorials/beginner",
					},
					{
						title: "Aplicação intermediária",
						href: "/learn/tutorials/intermediate",
					},
					{ title: "Projeto avançado", href: "/learn/tutorials/advanced" },
				],
			},
			{
				title: "Vídeo aulas",
				href: "/learn/videos",
				icon: <Video className="h-4 w-4" />,
				children: [
					{ title: "Introdução", href: "/learn/videos/introduction" },
					{ title: "Desenvolvimento", href: "/learn/videos/development" },
					{ title: "Casos de uso", href: "/learn/videos/case-studies" },
				],
			},
			{
				title: "Exercícios práticos",
				href: "/learn/exercises",
				icon: <Code className="h-4 w-4" />,
				children: [
					{ title: "Nível iniciante", href: "/learn/exercises/beginner" },
					{
						title: "Nível intermediário",
						href: "/learn/exercises/intermediate",
					},
					{ title: "Nível avançado", href: "/learn/exercises/advanced" },
				],
			},
		],
	},
	{
		id: "examples",
		title: "Exemplos",
		href: "docs/examples",
		icon: <Layout className="h-4 w-4" />,
		sections: [
			{
				title: "Aplicações demo",
				href: "/examples/demos",
				icon: <Laptop className="h-4 w-4" />,
				children: [
					{ title: "Blog", href: "/examples/demos/blog" },
					{ title: "E-commerce", href: "/examples/demos/ecommerce" },
					{ title: "Dashboard", href: "/examples/demos/dashboard" },
				],
			},
			{
				title: "Templates",
				href: "/examples/templates",
				icon: <FileText className="h-4 w-4" />,
				children: [
					{ title: "Landing page", href: "/examples/templates/landing" },
					{ title: "Admin", href: "/examples/templates/admin" },
					{ title: "Portfolio", href: "/examples/templates/portfolio" },
				],
			},
			{
				title: "Integrações",
				href: "/examples/integrations",
				icon: <Database className="h-4 w-4" />,
				children: [
					{ title: "APIs externas", href: "/examples/integrations/apis" },
					{
						title: "Bancos de dados",
						href: "/examples/integrations/databases",
					},
					{ title: "Autenticação", href: "/examples/integrations/auth" },
				],
			},
		],
	},
];

export const navigationConfig = {
	categories,
};
