import type {
	SizeConfig,
	InputSize,
	InputVariant,
	StyleConfig,
} from "@/lib/types/input.types";

export const sizeConfigs: Record<InputSize, SizeConfig> = {
	sm: {
		padding: "px-4 py-2",
		text: "text-p5",
		icon: "text-p5",
		border: "border",
	},
	md: {
		padding: "px-4 sm:px-3 xl:px-6 py-2 sm:py-3",
		text: "text-p5 sm:text-p4",
		icon: "text-base sm:text-lg",
		border: "border xl:border-2",
	},
	lg: {
		padding: "px-6 sm:px-8 xl:px-8 py-2 sm:py-3 xl:py-4",
		text: "text-p5 sm:text-p4 xl:text-p3",
		icon: "text-sm sm:text-base lg:text-lg xl:text-xl",
		border: "border sm:border-2",
	},
};

export const variantConfigs: Record<InputVariant, string> = {
	default: "bg-grey-100",
	filled: "bg-grey-50",
	minimal: "bg-transparent border-0 border-b-2 rounded-none",
};

export const getBorderColor = (
	errorMessages?: string[],
	successMessage?: string,
	isFocused?: boolean
): string => {
	if (errorMessages) return "border-red-500 shadow-err";
	if (successMessage) return "border-green-500 shadow-green-100";
	if (isFocused) return "border-primary-500 shadow-primary-100";
	return "border-grey-200 shadow-s1";
};

export const getIconColor = (
	errorMessages?: string[],
	successMessage?: string,
	isFocused?: boolean,
	disabled?: boolean
): string => {
	if (errorMessages) return "text-red-500";
	if (successMessage) return "text-green-500";
	if (isFocused) return "text-primary-500";
	if (disabled) return "text-grey-300";
	return "text-grey-400";
};

export const getLabelColor = (
	errorMessages?: string[],
	successMessage?: string
): string => {
	if (errorMessages) return "text-red-700";
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
        ${isFocused ? "ring-2 ring-opacity-20 ring-primary-500" : ""}
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
