import { fetchFilteredRecipes } from "@/lib/data";
import RecipeThumbnail from "../ui/recipe/recipe-thumbnail";

export default async function PopularRecipes() {
	const popularRecipes = await fetchFilteredRecipes({
		sortBy: "averageRating",
		sortOrder: "desc",
		limit: 5,
	});
	return (
		<section className="pt-16 pb-16 mx-6 sm:mx-24 2xl:mx-184 flex flex-col items-center gap-12">
			<h2>Popular recipes</h2>
			<div className="flex flex-row flex-nowrap overflow-y-visible gap-6 items-center justify-center w-fit">
				{popularRecipes.map((recipe, index) => (
					<RecipeThumbnail key={index} size="big" recipe={recipe} />
				))}
			</div>
		</section>
	);
}
