import { fetchRecipeAverageRating, fetchRecipeOfTheDay } from "@/lib/data";
import Button from "../ui/button";
import Image from "next/image";
import { HiOutlineClock, HiOutlineStar } from "react-icons/hi2";
import Badge from "../ui/badge";

export default async function Recipe() {
	const recipe = await fetchRecipeOfTheDay();
	const averageRating = await fetchRecipeAverageRating(recipe.id);
	const hours = Math.floor(recipe.preparationTime / 60);
	const minutes = recipe.preparationTime % 60;
	return (
		<div className="flex flex-col xl:flex-row gap-4 sm:gap-6 xl:gap-16 justify-between items-center sm:items-start w-full">
			<Image
				alt={recipe.name}
				src={recipe.photo}
				height={500}
				width={500}
				style={{
					objectFit: "cover",
				}}
				loading="lazy"
				className="w-3/4 sm:w-6/8 xl:w-1/3 aspect-square rounded-4xl shadow-s1"
			/>
			<div className="flex flex-col w-full xl:w-8/12 h-full justify-between items-center sm:items-start">
				<h3 className="text-p3 sm:text-h4 lg:text-h3 font-semibold mb-3 xl:mb-6 text-grey-800 text-center sm:text-left">
					{recipe.name}
				</h3>
				<div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8">
					<Badge
						color="primary"
						size="big"
						text={`${hours !== 0 ? hours + "h " : ""}${
							minutes !== 0 ? minutes + "min" : ""
						}`}
						icon={
							<HiOutlineClock className="text-xs sm:text-base xl:text-xl text-primary-600 stroke-1" />
						}
					/>
					<Badge
						color="primary"
						size="medium"
						text={recipe.difficultyLevel.toLowerCase()}
					/>
					<Badge
						color="primary"
						size="small"
						text={`${recipe.servingsNumber} servings`}
					/>
					<Badge
						color="primary"
						size="big"
						text={`${averageRating.toFixed(1)}`}
						icon={
							<HiOutlineStar className="text-xs sm:text-base xl:text-xl text-primary-600 stroke-1" />
						}
						iconLeft={false}
					/>
				</div>
				<div className="line-clamp-3 xl:mb-14">
					{recipe.recipeSteps.map((step, index) => (
						<div key={index} className="hidden xl:block xl:mb-10">
							<p className="text-p1 font-semibold text-grey-700 mb-2">
								{step.name}:
							</p>
							<ul>
								{step.stepBullets.map((bullet, bulletIndex) => (
									<li
										className="text-p2 text-grey-700 mb-1"
										key={bulletIndex}
									>
										{bullet.content}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<Button
					variant="filled"
					color="primary"
					size="medium"
					text="Log in to read full recipe"
					link="/signin"
				/>
			</div>
		</div>
	);
}
