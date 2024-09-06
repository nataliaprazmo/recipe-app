import type {
	SizeConfig,
	InputSize,
	InputVariant,
	StyleConfig,
} from "@/lib/types/input.types";

export const sizeConfigs: Record<InputSize, SizeConfig> = {
	sm: {
		padding: "px-4 py-2",
		text: "text-sm",
		icon: "text-sm",
		border: "border",
	},
	md: {
		padding: "px-8 py-4",
		text: "text-lg",
		icon: "text-xl",
		border: "border-2",
	},
	lg: {
		padding: "px-6 sm:px-8 xl:px-12 py-2 sm:py-3 xl:py-4",
		text: "text-p5 sm:text-p3 xl:text-p1",
		icon: "text-base sm:text-xl lg:text-2xl xl:text-32",
		border: "border-[1px] sm:border-2",
	},
};

export const variantConfigs: Record<InputVariant, string> = {
	default: "bg-grey-100",
	filled: "bg-grey-50",
	minimal: "bg-transparent border-0 border-b-2 rounded-none",
};

export const getBorderColor = (
	errorMessage?: string,
	successMessage?: string,
	isFocused?: boolean
): string => {
	if (errorMessage) return "border-red-500 shadow-err";
	if (successMessage) return "border-green-500 shadow-green-100";
	if (isFocused) return "border-blue-500 shadow-blue-100";
	return "border-grey-200 shadow-s1";
};

export const getIconColor = (
	errorMessage?: string,
	successMessage?: string,
	isFocused?: boolean,
	disabled?: boolean
): string => {
	if (errorMessage) return "text-red-500";
	if (successMessage) return "text-green-500";
	if (isFocused) return "text-blue-500";
	if (disabled) return "text-grey-300";
	return "text-grey-400";
};

export const getLabelColor = (
	errorMessage?: string,
	successMessage?: string
): string => {
	if (errorMessage) return "text-red-700";
	if (successMessage) return "text-green-700";
	return "text-grey-700";
};

export const getCharacterCountColor = (
	currentLength: number,
	maxLength: number
): string => {
	if (currentLength === maxLength) return "text-red-500";
	if (currentLength > maxLength * 0.9) return "text-orange-500";
	return "text-grey-400";
};

export const getIconClasses = (
	size: InputSize,
	styleConfig: StyleConfig
): string => {
	return `${sizeConfigs[size].icon} ${styleConfig.iconColor} stroke-1 sm:stroke-2 transition-colors duration-200`;
};

export const getInputContainerClasses = (
	size: InputSize,
	variant: InputVariant,
	styleConfig: StyleConfig,
	disabled: boolean,
	isFocused: boolean
): string => {
	return `
        w-full ${sizeConfigs[size].padding} flex justify-between items-center 
        ${sizeConfigs[size].border} ${styleConfig.borderColor} 
        ${variant === "minimal" ? "rounded-none" : "rounded-full"}
        ${variantConfigs[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        transition-all duration-200 ease-in-out
        ${isFocused ? "ring-2 ring-opacity-20 ring-blue-500" : ""}
    `
		.replace(/\s+/g, " ")
		.trim();
};

export const getInputClasses = (
	variant: InputVariant,
	size: InputSize,
	disabled: boolean
): string => {
	return `
        ${variantConfigs[variant]} ${sizeConfigs[size].text} 
        text-grey-700 outline-none flex-1 min-w-0
        ${disabled ? "cursor-not-allowed" : ""}
        placeholder:text-grey-400
    `
		.replace(/\s+/g, " ")
		.trim();
};
