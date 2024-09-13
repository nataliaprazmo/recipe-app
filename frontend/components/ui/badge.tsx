interface BadgeProps {
	text: string;
	icon?: React.ReactNode;
	iconLeft?: boolean;
	classes?: string;
	size: "small" | "medium" | "big";
	color: "primary" | "secondary";
}

export default function Badge({
	text,
	icon,
	iconLeft,
	classes,
	size,
	color,
}: BadgeProps) {
	const sizeClasses =
		size === "big"
			? "gap-1 sm:gap-2 xl:gap-4 px-3 py-1.5 sm:px-4 xl:px-6 xl:py-2"
			: size === "medium"
			? "gap-1 sm:gap-2 xl:gap-4 px-2.5 py-0.5 sm:py-1 sm:px-5"
			: "gap-0.5 px-3 py-1";
	return (
		<div
			className={`flex ${
				iconLeft ? "flex-row" : "flex-row-reverse"
			} items-center justify-center rounded-full border shadow-s1 ${
				color === "primary"
					? "bg-primary-200 border-primary-300"
					: "bg-grey-100 border-grey-200"
			} ${sizeClasses} ${classes}`}
		>
			<p
				className={`text-p5 sm:text-p4 xl:text-p3 font-semibold ${
					color === "primary" ? "text-primary-600" : "text-grey-600"
				}`}
			>
				{text}
			</p>
			{icon && <span>{icon}</span>}
		</div>
	);
}
