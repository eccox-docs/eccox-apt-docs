"use client";

import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface CalloutProps {
	type?: "info" | "warning" | "tip";
	title?: string;
	children: React.ReactNode;
}

export function MdxCallout({ type = "info", title, children }: CalloutProps) {
	const icons = {
		info: <Info className="h-5 w-5 stroke-blue-500" />,
		warning: <AlertTriangle className="h-5 w-5 stroke-rose-500" />,
		tip: <Lightbulb className="h-5 w-5 stroke-yellow-500" />,
	};

	return (
		<Alert variant="default" className="border-l-4 ">
			{icons[type]}
			{title && <AlertTitle>{title}</AlertTitle>}
			<AlertDescription>{children}</AlertDescription>
		</Alert>
	);
}
