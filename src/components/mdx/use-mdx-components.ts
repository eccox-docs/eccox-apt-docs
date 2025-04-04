import type { MDXComponents } from "mdx/types";
import { components as defaultComponents } from "./mdx-components";

export function useMDXComponents(custom: MDXComponents): MDXComponents {
	return {
		...defaultComponents,
		...custom, // custom components passed by caller
	};
}
