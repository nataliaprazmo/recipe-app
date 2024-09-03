import { Suspense } from "react";
import Recipe from "./recipe";
import RecipeOfTheDaySkeleton from "../skeletons/recipe-of-the-day-skeleton";

export default function RecipeOfTheDay() {
	return (
		<section className="px-6 sm:px-24 2xl:px-184 py-12 flex flex-col items-center sm:items-start gap-6 sm:gap-12 xl:gap-20">
			<h2 className="text-h4 lg:text-h2 font-bold w-full text-left sm:text-center">
				Quick look at today's best recipe!
			</h2>
			<Suspense fallback={<RecipeOfTheDaySkeleton />}>
				<Recipe />
			</Suspense>
		</section>
	);
}
