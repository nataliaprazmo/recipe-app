import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface LoadingSpinnerProps {
	size?: "small" | "medium" | "large";
	className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	size = "medium",
	className = "",
}) => {
	const sizeMap = {
		small: 16,
		medium: 20,
		large: 24,
	};

	return (
		<AiOutlineLoading
			size={sizeMap[size]}
			className={`animate-spin ${className}`}
			aria-label="Loading"
		/>
	);
};

export default LoadingSpinner;
