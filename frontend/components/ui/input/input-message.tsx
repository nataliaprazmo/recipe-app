interface InputMessagesProps {
	inputId: string;
	errorMessage?: string;
	successMessage?: string;
	helperText?: string;
}

export default function InputMessages({
	inputId,
	errorMessage,
	successMessage,
	helperText,
}: InputMessagesProps) {
	const baseClasses = "w-fit mt-1 sm:mt-2 text-p6 sm:text-p4 xl:text-p2";

	if (errorMessage) {
		return (
			<p
				id={`${inputId}-error`}
				className={`${baseClasses} text-red-600`}
				role="alert"
				aria-live="polite"
			>
				{errorMessage}
			</p>
		);
	}

	if (successMessage) {
		return (
			<p
				id={`${inputId}-success`}
				className={`${baseClasses} text-green-600`}
				role="status"
				aria-live="polite"
			>
				{successMessage}
			</p>
		);
	}

	if (helperText) {
		return (
			<p
				id={`${inputId}-helper`}
				className={`${baseClasses} text-grey-500`}
			>
				{helperText}
			</p>
		);
	}

	return null;
}
