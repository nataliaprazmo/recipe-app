export default function RecipeOfTheDaySkeleton() {
	return (
		<div className="flex flex-col xl:flex-row gap-4 sm:gap-6 xl:gap-16 justify-between items-center sm:items-start w-full">
			{/* Image skeleton */}
			<div className="w-3/4 sm:w-6/8 xl:w-1/3 aspect-square rounded-4xl bg-gray-200 animate-pulse" />

			<div className="flex flex-col w-full xl:w-8/12 h-full justify-between items-center sm:items-start">
				{/* Title skeleton */}
				<div className="h-8 sm:h-10 lg:h-12 bg-gray-200 animate-pulse rounded mb-3 xl:mb-6 w-3/4 sm:w-2/3" />

				{/* Badges skeleton */}
				<div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8">
					<div className="h-8 sm:h-10 bg-gray-200 animate-pulse rounded-full px-4 w-20 sm:w-24" />
					<div className="h-8 sm:h-10 bg-gray-200 animate-pulse rounded-full px-4 w-16 sm:w-20" />
				</div>

				{/* Recipe steps skeleton */}
				<div className="line-clamp-3 xl:mb-10 w-full">
					<div className="hidden xl:block mb-6">
						<div className="h-5 bg-gray-200 animate-pulse rounded mb-2 w-1/4" />
						<div className="space-y-2">
							<div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
							<div className="h-4 bg-gray-200 animate-pulse rounded w-5/6" />
						</div>
					</div>
				</div>

				{/* Button skeleton */}
				<div className="h-10 sm:h-12 xl:h-14 bg-gray-200 animate-pulse rounded w-48 sm:w-56 xl:w-64" />
			</div>
		</div>
	);
}
