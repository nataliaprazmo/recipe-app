import { ReactNode, MouseEvent } from "react";

export type ButtonVariant = "outlined" | "filled" | "text";
export type ButtonColor = "primary" | "secondary" | "dark";
export type ButtonSize = "small" | "medium" | "large";

export interface BaseButtonProps {
	variant: ButtonVariant;
	color: ButtonColor;
	size: ButtonSize;
	icon?: ReactNode;
	text: string;
	disabled?: boolean;
	loading?: boolean;
	fullWidth?: boolean;
	additionalclasses?: string;
}

export interface ButtonAsButtonProps extends BaseButtonProps {
	type?: "button" | "submit" | "reset";
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	link?: never;
	scroll?: never;
}

export interface ButtonAsLinkProps extends BaseButtonProps {
	link: string;
	scroll?: boolean;
	type?: never;
	onClick?: never;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export interface ButtonStyleConfig {
	variant: Record<ButtonVariant, string>;
	color: {
		[K in ButtonColor]: {
			[V in ButtonVariant]: {
				normal: string;
				disabled: string;
			};
		};
	};
	size: Record<ButtonSize, string>;
}
