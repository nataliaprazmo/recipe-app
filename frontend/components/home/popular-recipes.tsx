import { fetchFilteredRecipes } from "@/lib/data";
import RecipeThumbnail from "../ui/recipe/recipe-thumbnail";
import RecipeGrid from "../ui/recipe/recipe-grid";
import { HiOutlineHeart } from "react-icons/hi2";

export default async function PopularRecipes() {
	const popularRecipes = await fetchFilteredRecipes({
		sortBy: "averageRating",
		sortOrder: "desc",
		limit: 5,
	});
	return (
		<section className="pt-16 pb-18 md:pb-24 mx-6 sm:mx-24 2xl:mx-184 flex flex-col items-center gap-6 md:gap-8 3xl:gap-12">
			<h3 className="text-p2 font-lato sm:text-h4 xl:text-h3">
				Popular recipes
			</h3>
			<RecipeGrid>
				{popularRecipes.map((recipe, index) => (
					<RecipeThumbnail key={index} recipe={recipe} />
				))}
			</RecipeGrid>
		</section>
	);
}
