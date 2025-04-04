import { baseComponents } from "./base-components";
import { Icons } from "./icons";

export const components = {
	...baseComponents,
	...Icons, // permite uso de <Terminal /> ou <BookOpen /> diretamente no MDX
};
