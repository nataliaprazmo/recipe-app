import { HiOutlineEyeOff } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi2";

interface PasswordToggleIconProps {
	showPassword: boolean;
	onToggle: () => void;
	className?: string;
}

export default function PasswordToggle({
	showPassword,
	onToggle,
	className = "",
}: PasswordToggleIconProps) {
	const baseClasses = `hover:text-grey-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded p-1 transition-colors duration-200`;
	const combinedClasses = `${className} ${baseClasses}`;
	return (
		<button
			type="button"
			onClick={onToggle}
			className={combinedClasses}
			aria-label={showPassword ? "Hide password" : "Show password"}
			tabIndex={-1}
		>
			{showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
		</button>
	);
}
