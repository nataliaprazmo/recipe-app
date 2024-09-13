import { Suspense } from "react";
import Recipe from "./recipe";
import RecipeOfTheDaySkeleton from "../skeletons/recipe-of-the-day-skeleton";

export default function RecipeOfTheDay() {
	return (
		<section className="px-6 sm:px-24 2xl:px-184 py-12 flex flex-col items-center sm:items-start gap-4 sm:gap-8 xl:gap-12">
			<h3 className="text-p2 font-lato sm:text-h4 xl:text-h3 font-bold w-full md:text-left text-center mx-auto md:mx-0">
				Quick look at today's best recipe!
			</h3>
			<Suspense fallback={<RecipeOfTheDaySkeleton />}>
				<Recipe />
			</Suspense>
		</section>
	);
}
