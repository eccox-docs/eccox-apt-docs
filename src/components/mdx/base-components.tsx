import { cn } from "@/lib/utils";
import Link from "next/link";
import { MdxCallout } from "../mdx-callout";
import { MdxImage } from "../mdx-image";
import { MdxVideoPlayer } from "../mdx-video-player";
import { VideoGrid, ResponsiveVideoGrid, VideoGridContainer } from "../mdx-video-grid";

export const baseComponents = {
	Link,
	MdxCallout,
	MdxImage,
	MdxVideoPlayer,
	VideoGrid,
	ResponsiveVideoGrid,
	VideoGridContainer,
	h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1
			className={cn(
				"mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className={cn(
				"mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className={cn(
				"mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h4
			className={cn(
				"mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p
			className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
			{...props}
		/>
	),
	a: ({
		className,
		href,
		...props
	}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
		const isInternal = href && !href.startsWith("http");
		if (isInternal) {
			return (
				<Link
					href={href || "#"}
					className={cn("font-medium underline underline-offset-4", className)}
					{...props}
				/>
			);
		}
		return (
			<a
				className={cn("font-medium underline underline-offset-4", className)}
				target="_blank"
				rel="noopener noreferrer"
				href={href}
				{...props}
			/>
		);
	},
	ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
		<ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
	),
	ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
		<ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
	),
	li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
		<li className={cn("mt-2", className)} {...props} />
	),
	blockquote: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLQuoteElement>) => (
		<blockquote
			className={cn(
				"mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<code
			className={cn(
				"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
		<pre
			className={cn(
				"mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
				className,
			)}
			{...props}
		/>
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="my-6 w-full overflow-y-auto">
			<table className={cn("w-full", className)} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={cn("m-0 border-t p-0 even:bg-muted", className)}
			{...props}
		/>
	),
	th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
		<th
			className={cn("border px-4 py-2 text-left font-bold", className)}
			{...props}
		/>
	),
	td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
		<td className={cn("border px-4 py-2 text-left", className)} {...props} />
	),
};
