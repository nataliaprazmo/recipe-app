import { getCharacterCountColor } from "@/styles/input.styles";

interface TextfieldCharacterCountProps {
	currentLength: number;
	maxLength: number;
}

export default function TextfieldCharacterCount({
	currentLength,
	maxLength,
}: TextfieldCharacterCountProps) {
	const colorClass = getCharacterCountColor(currentLength, maxLength);
	return (
		<span
			className={`text-xs ${colorClass} flex-shrink-0`}
			aria-label={`${currentLength} of ${maxLength} characters used`}
		>
			{currentLength}/{maxLength}
		</span>
	);
}
