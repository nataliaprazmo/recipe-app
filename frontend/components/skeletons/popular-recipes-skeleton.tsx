import RecipeThumbnailSkeleton from "./recipe-thumbnail-skeleton";

export default function PopularRecipesSkeleton() {
	return (
		<section className="pt-16 pb-16 mx-6 sm:mx-24 2xl:mx-184 flex flex-col items-center gap-12 animate-pulse">
			<div className="h-16 w-60 bg-gray-200" />
			<RecipeThumbnailSkeleton />
		</section>
	);
}
