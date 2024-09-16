type RecipeGridProps = {
	className?: string;
	children: React.ReactNode;
};

export default function RecipeGrid({ className, children }: RecipeGridProps) {
	return (
		<div
			className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 w-full max-w-72 sm:max-w-[1600px] ${
				className ? className : ""
			}`}
		>
			{children}
		</div>
	);
}
