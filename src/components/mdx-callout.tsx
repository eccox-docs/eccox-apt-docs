"use client";

import { AlertTriangle, Info, Lightbulb, Link } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface CalloutProps {
	type?: "info" | "warning" | "tip" | "link";
	title?: string;
	children: React.ReactNode;
}

export function MdxCallout({ type = "info", title, children }: CalloutProps) {
	const icons = {
		info: <Info className="h-5 w-5 stroke-blue-500" />,
		warning: <AlertTriangle className="h-5 w-5 stroke-amber-500" />,
		tip: <Lightbulb className="h-5 w-5 stroke-yellow-500" />,
		link: <Link className="h-5 w-5 stroke-blue-500" />,
	};

	return (
		<Alert variant="default" className="border-l-4 mt-4">
			{icons[type]}
			{title && <AlertTitle>{title}</AlertTitle>}
			<AlertDescription>{children}</AlertDescription>
		</Alert>
	);
}
