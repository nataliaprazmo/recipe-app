"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { ButtonProps } from "@/lib/types/button.types";
import {
	generateButtonClasses,
	handleSmoothScroll,
	shouldUseSmoothScroll,
	validateButtonProps,
} from "@/lib/utils/button.utils";
import LoadingSpinner from "./loading-spinner";

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
	(props, ref) => {
		const {
			variant,
			color,
			size,
			icon,
			text,
			disabled = false,
			loading = false,
			fullWidth = false,
			additionalclasses = "",
			...restProps
		} = props;

		if (process.env.NODE_ENV === "development") {
			validateButtonProps(props);
		}

		const classes = generateButtonClasses({
			variant,
			color,
			size,
			disabled: disabled || loading,
			loading,
			fullWidth,
			additionalclasses,
		});

		const spinnerSize =
			size === "large" ? "large" : size === "small" ? "small" : "medium";

		const buttonContent = (
			<>
				{loading && (
					<LoadingSpinner size={spinnerSize} className="mr-2" />
				)}
				<span className={loading ? "opacity-70" : ""}>{text}</span>
				{!loading && icon && <span className="ml-auto">{icon}</span>}
			</>
		);

		if ("link" in props && props.link) {
			const { link, scroll, ...linkProps } = props;
			const { loading: _, ...cleanLinkProps } = linkProps;

			return (
				<Link
					href={link}
					className={classes}
					onClick={(e) =>
						shouldUseSmoothScroll(link, scroll)
							? handleSmoothScroll(e, link)
							: undefined
					}
					ref={ref as React.Ref<HTMLAnchorElement>}
					aria-disabled={disabled || loading}
					{...cleanLinkProps}
				>
					{buttonContent}
				</Link>
			);
		}

		const { type = "button", onClick, loading: _, ...buttonProps } = props;

		return (
			<button
				type={type}
				className={classes}
				disabled={disabled || loading}
				onClick={loading ? undefined : onClick}
				ref={ref as React.Ref<HTMLButtonElement>}
				aria-busy={loading}
				{...buttonProps}
			>
				{buttonContent}
			</button>
		);
	}
);

Button.displayName = "Button";

export default Button;
