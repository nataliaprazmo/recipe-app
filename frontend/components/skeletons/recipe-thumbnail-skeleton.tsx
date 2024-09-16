import RecipeGrid from "../ui/recipe/recipe-grid";

export default function RecipeThumbnailSkeleton() {
	return (
		<RecipeGrid className="animate-pulse">
			{Array.from({ length: 5 }).map((_, index) => (
				<div
					key={index}
					className="flex flex-col items-start justify-start w-full"
				>
					<div className="rounded-3xl aspect-square w-full bg-gray-200" />
					<div className="h-8 w-36 bg-gray-200 mt-6 mb-3" />
					<div className="flex flex-row flex-wrap gap-x-2 gap-y-1 w-full">
						<div className="rounded-full h-8 w-28 bg-gray-200" />
						<div className="rounded-full h-8 w-18 bg-gray-200" />
					</div>
				</div>
			))}
		</RecipeGrid>
	);
}
