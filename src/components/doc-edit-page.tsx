import { FilePenLine } from "lucide-react";
import Link from "next/link";

interface EditPageProps {
  url: string;
}

export function EditPage({ url }: EditPageProps) {
  return (
    <div className="flex justify-center items-center sm:justify-start">
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
      >
        <FilePenLine size={16} className="inline-block mr-2" />
        <span className="whitespace-nowrap">Editar esta página</span>
      </Link>
    </div>
  );
}
