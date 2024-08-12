import { MouseEvent } from "react";
import { ButtonVariant, ButtonColor, ButtonSize } from "@/types/button.types";
import {
	buttonStyles,
	baseClasses,
	getShadowClasses,
	getFocusClasses,
} from "@/styles/button-styles.config";

export const cn = (...classes: (string | undefined | false)[]): string => {
	return classes.filter(Boolean).join(" ");
};

export const generateButtonClasses = ({
	variant,
	color,
	size,
	disabled = false,
	loading = false,
	fullWidth = false,
	additionalclasses = "",
}: {
	variant: ButtonVariant;
	color: ButtonColor;
	size: ButtonSize;
	disabled?: boolean;
	loading?: boolean;
	fullWidth?: boolean;
	additionalclasses?: string;
}): string => {
	const variantClasses = buttonStyles.variant[variant];
	const colorClasses = disabled
		? buttonStyles.color[color][variant].disabled
		: buttonStyles.color[color][variant].normal;
	const sizeClasses = buttonStyles.size[size];
	const shadowClasses = getShadowClasses(variant, size);
	const focusClasses = getFocusClasses(color);

	const widthClasses =
		variant === "text" ? "w-fit" : fullWidth ? "w-full" : "";
	const loadingClasses = loading ? "cursor-wait opacity-70" : "";
	const disabledClasses = disabled ? "cursor-not-allowed" : "cursor-pointer";

	const finalClasses = cn(
		baseClasses,
		variantClasses,
		colorClasses,
		sizeClasses,
		shadowClasses,
		focusClasses,
		widthClasses,
		loadingClasses,
		disabledClasses,
		additionalclasses
	);

	return finalClasses;
};

export const handleSmoothScroll = (
	event: MouseEvent<HTMLAnchorElement>,
	href: string
): void => {
	event.preventDefault();

	if (href.startsWith("#")) {
		const targetElement = document.querySelector(href);
		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
		return;
	}

	window.location.href = href;
};

export const shouldUseSmoothScroll = (
	link: string,
	scroll?: boolean
): boolean => {
	return Boolean(scroll && link.startsWith("#"));
};

export const validateButtonProps = (props: any): void => {
	const { variant, color, size, text } = props;

	if (!variant || !["outlined", "filled", "text"].includes(variant)) {
		console.warn("Button: Invalid or missing variant prop");
	}

	if (!color || !["primary", "secondary", "dark"].includes(color)) {
		console.warn("Button: Invalid or missing color prop");
	}

	if (!size || !["small", "medium", "large"].includes(size)) {
		console.warn("Button: Invalid or missing size prop");
	}

	if (!text || typeof text !== "string") {
		console.warn("Button: Invalid or missing text prop");
	}
};
