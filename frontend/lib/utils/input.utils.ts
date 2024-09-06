import { getBorderColor, getIconColor } from "@/styles/input.styles";
import type { StyleConfig } from "../types/input.types";

export const generateInputId = (id?: string, generatedId?: string): string => {
	return id || generatedId || "";
};

export const isPasswordField = (
	type: string,
	showPasswordToggle: boolean
): boolean => {
	return type === "password" && showPasswordToggle;
};

export const getInputType = (
	type: string,
	isPassword: boolean,
	showPassword: boolean
): string => {
	return isPassword && showPassword ? "text" : type;
};

export const getAriaDescribedBy = (
	inputId: string,
	errorMessage?: string,
	successMessage?: string,
	helperText?: string
): string | undefined => {
	if (errorMessage) return `${inputId}-error`;
	if (successMessage) return `${inputId}-success`;
	if (helperText) return `${inputId}-helper`;
	return undefined;
};

export const shouldShowCharacterCount = (
	maxLength?: number,
	valueLength?: number
): boolean => {
	return !!(maxLength && valueLength && valueLength > 0);
};

export const getStyleConfig = (
	errorMessage?: string,
	successMessage?: string,
	isFocused?: boolean,
	disabled?: boolean
): StyleConfig => {
	return {
		borderColor: getBorderColor(errorMessage, successMessage, isFocused),
		iconColor: getIconColor(
			errorMessage,
			successMessage,
			isFocused,
			disabled
		),
	};
};

export const createEventHandlers = (
	setIsFocused: (focused: boolean) => void,
	onFocus?: React.FocusEventHandler,
	onBlur?: React.FocusEventHandler
) => {
	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(true);
		onFocus?.(e);
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(false);
		onBlur?.(e);
	};

	return { handleFocus, handleBlur };
};
