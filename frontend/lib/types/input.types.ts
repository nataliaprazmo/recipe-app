export interface InputProps {
	leftIcon?: React.ComponentType<{ className?: string }>;
	placeholder: string;
	name: string;
	id?: string;
	value: string;
	type: string;
	rightIcon?: React.ComponentType<{ className?: string }> | React.ReactNode;
	errorMessage?: string;
	successMessage?: string;
	helperText?: string;
	additionalClasses?: string;
	changeValue: React.ChangeEventHandler;
	onBlur?: React.FocusEventHandler;
	onFocus?: React.FocusEventHandler;
	required?: boolean;
	disabled?: boolean;
	maxLength?: number;
	minLength?: number;
	autoComplete?: string;
	label?: string;
	size?: InputSize;
	variant?: InputVariant;
	showPasswordToggle?: boolean;
}

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "filled" | "minimal";

export interface SizeConfig {
	padding: string;
	text: string;
	icon: string;
	border: string;
}

export interface InputState {
	showPassword: boolean;
	isFocused: boolean;
}

export interface StyleConfig {
	borderColor: string;
	iconColor: string;
}
