export default function CategoriesSkeleton() {
	return (
		<section className="my-16 flex flex-col items-center">
			<h3 className="text-h3 font-bold mb-10 text-center">
				Explore popular categories
			</h3>
			<div className="flex flex-row flex-shrink-0 gap-4 overflow-hidden w-fit">
				{Array.from({ length: 7 }).map((_, index) => (
					<div
						key={index}
						className="border border-gray-200 bg-gray-200 w-80 md:w-{24rem} h-40 rounded-3xl mb-4 animate-pulse"
					/>
				))}
			</div>
		</section>
	);
}
