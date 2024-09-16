export default function RecipeThumbnailSkeleton() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 w-full max-w-72 sm:max-w-[1600px] animate-pulse">
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
		</div>
	);
}
