import { getLabelColor } from "@/styles/input.styles";

interface InputLabelProps {
	label: string;
	htmlFor: string;
	required?: boolean;
	errorMessage?: string;
	successMessage?: string;
}

export default function InputLabel({
	label,
	htmlFor,
	required,
	errorMessage,
	successMessage,
}: InputLabelProps) {
	const colorClass = getLabelColor(errorMessage, successMessage);

	return (
		<label
			htmlFor={htmlFor}
			className={`block text-sm font-medium mb-2 ${colorClass} ${
				required
					? "after:content-['*'] after:text-red-500 after:ml-1"
					: ""
			}`}
		>
			{label}
		</label>
	);
}
