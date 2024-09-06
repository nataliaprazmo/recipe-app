"use client";

import {
	createEventHandlers,
	generateInputId,
	getAriaDescribedBy,
	getInputType,
	getStyleConfig,
	isPasswordField,
	shouldShowCharacterCount,
} from "@/lib/utils/input.utils";
import InputMessages from "./input-message";
import PasswordToggle from "./password-toggle";
import TextfieldCharacterCount from "./textfield-characters-count";
import InputLabel from "./input-label";
import { InputProps } from "@/lib/types/input.types";
import { forwardRef, useId, useState } from "react";
import {
	getIconClasses,
	getInputClasses,
	getInputContainerClasses,
} from "@/styles/input.styles";

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			placeholder,
			name,
			id,
			value,
			type,
			leftIcon: LeftIcon,
			rightIcon: RightIcon,
			errorMessage,
			successMessage,
			helperText,
			additionalClasses,
			changeValue,
			onBlur,
			onFocus,
			required,
			disabled = false,
			maxLength,
			minLength,
			autoComplete,
			label,
			size = "md",
			variant = "default",
			showPasswordToggle = true,
			...props
		},
		ref
	) => {
		const [showPassword, setShowPassword] = useState(false);
		const [isFocused, setIsFocused] = useState(false);

		const generatedId = useId();
		const inputId = generateInputId(id, generatedId);

		const isPassword = isPasswordField(type, showPasswordToggle);
		const inputType = getInputType(type, isPassword, showPassword);

		const styleConfig = getStyleConfig(
			errorMessage,
			successMessage,
			isFocused,
			disabled
		);

		const { handleFocus, handleBlur } = createEventHandlers(
			setIsFocused,
			onFocus,
			onBlur
		);

		const togglePassword = () => {
			setShowPassword((prev) => !prev);
		};

		const iconClasses = getIconClasses(size, styleConfig);
		const containerClasses = getInputContainerClasses(
			size,
			variant,
			styleConfig,
			disabled,
			isFocused
		);
		const inputClasses = getInputClasses(variant, size, disabled);

		return (
			<div
				className={`${additionalClasses} ${
					errorMessage && "flex flex-col justify-end items-end mb-1"
				}`}
			>
				{label && (
					<InputLabel
						label={label}
						htmlFor={inputId}
						required={required}
						errorMessage={errorMessage}
						successMessage={successMessage}
					/>
				)}

				<div className={containerClasses}>
					<div className="flex gap-4 items-center flex-1 min-w-0">
						{LeftIcon && (
							<div className="flex-shrink-0">
								<LeftIcon className={iconClasses} />
							</div>
						)}

						<input
							ref={ref}
							className={inputClasses}
							type={inputType}
							name={name}
							value={value}
							id={inputId}
							placeholder={placeholder}
							onChange={changeValue}
							onFocus={handleFocus}
							onBlur={handleBlur}
							aria-label={label || placeholder}
							aria-invalid={!!errorMessage}
							aria-describedby={getAriaDescribedBy(
								inputId,
								errorMessage,
								successMessage,
								helperText
							)}
							required={required}
							disabled={disabled}
							maxLength={maxLength}
							minLength={minLength}
							autoComplete={autoComplete}
							{...props}
						/>

						{shouldShowCharacterCount(maxLength, value.length) && (
							<TextfieldCharacterCount
								currentLength={value.length}
								maxLength={maxLength!}
							/>
						)}
					</div>

					<div className="flex items-center gap-2 flex-shrink-0">
						{isPassword && (
							<PasswordToggle
								showPassword={showPassword}
								onToggle={togglePassword}
								className={iconClasses}
							/>
						)}

						{RightIcon &&
							!isPassword &&
							(typeof RightIcon === "function" ? (
								<RightIcon className={iconClasses} />
							) : (
								RightIcon
							))}
					</div>
				</div>

				<InputMessages
					inputId={inputId}
					errorMessage={errorMessage}
					successMessage={successMessage}
					helperText={helperText}
				/>
			</div>
		);
	}
);

Input.displayName = "Input";

export default Input;
