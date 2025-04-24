import { getLabelColor } from "@/styles/input.styles";

interface InputLabelProps {
	label: string;
	htmlFor: string;
	required?: boolean;
	errorMessages?: string[];
	successMessage?: string;
}

export default function InputLabel({
	label,
	htmlFor,
	required,
	errorMessages,
	successMessage,
}: InputLabelProps) {
	const colorClass = getLabelColor(errorMessages, successMessage);

	return (
		<label
			htmlFor={htmlFor}
			className={`block w-full text-p5 sm:text-p4 font-medium mb-2 ${colorClass} ${
				required
					? "after:content-['*'] after:text-red-500 after:ml-1"
					: ""
			}`}
		>
			{label}
		</label>
	);
}
