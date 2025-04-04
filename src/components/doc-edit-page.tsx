import { FilePenLine } from "lucide-react";
import Link from "next/link";

interface EditPageProps {
	url: string;
}

export function EditPage({ url }: EditPageProps) {
	return (
		<Link
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
		>
			<FilePenLine size={16} className="inline-block mr-2" />
			Editar esta página
		</Link>
	);
}
