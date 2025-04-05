import Image, { type ImageProps } from "next/image";

interface MdxImageProps extends Omit<ImageProps, "src"> {
	src: string;
}

export function MdxImage(props: MdxImageProps) {
	const { src, ...rest } = props;
	const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
	const imageSrc = src.startsWith("/") ? `${basePath}${src}` : src;

	return <Image {...rest} alt={props.alt || "Image"} src={imageSrc} />;
}
