interface InputMessagesProps {
	inputId: string;
	errorMessages?: string[];
	successMessage?: string;
	helperText?: string;
}

export default function InputMessages({
	inputId,
	errorMessages,
	successMessage,
	helperText,
}: InputMessagesProps) {
	const baseClasses = "w-fit mt-1 sm:mt-2 text-p5 sm:text-p4";

	if (errorMessages) {
		return (
			<div className="flex flex-col gap-2">
				{errorMessages.map((errorMessage, index) => (
					<p
						key={index}
						id={`${inputId}-error`}
						className={`${baseClasses} text-red-600`}
						role="alert"
						aria-live="polite"
					>
						{errorMessage}
					</p>
				))}
			</div>
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
