import { fetchRecipeOfTheDay } from "@/lib/data";
import Button from "../ui/button";
import Image from "next/image";
import { HiOutlineClock, HiOutlineStar } from "react-icons/hi2";
import Badge from "../ui/badge";

export default async function RecipeOfTheDay() {
	const recipe = await fetchRecipeOfTheDay();
	const hours = Math.floor(recipe.preparationTime / 60);
	const minutes = recipe.preparationTime % 60;
	return (
		<div className="flex flex-col md:flex-row gap-4 sm:gap-6 xl:gap-14 justify-between items-center sm:items-start md:items-center w-full">
			<Image
				alt={recipe.name}
				src={recipe.photo}
				height={500}
				width={500}
				style={{
					objectFit: "cover",
				}}
				loading="lazy"
				className="w-3/4 sm:w-2/3 xl:w-3/6 aspect-square rounded-4xl shadow-s1"
			/>
			<div className="flex flex-col w-full xl:w-8/12 h-full justify-between items-center sm:items-start">
				<h3 className="text-p3 font-lato sm:text-h4 lg:text-h3 font-medium mb-3 xl:mb-6 text-grey-800 text-center sm:text-left">
					{recipe.name}
				</h3>
				<div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8">
					<Badge
						color="primary"
						size="medium"
						text={`${hours !== 0 ? hours + "h " : ""}${
							minutes !== 0 ? minutes + "min" : ""
						}`}
						icon={<HiOutlineClock />}
					/>
					<Badge
						color="primary"
						size="medium"
						text={recipe.difficultyLevel.toLowerCase()}
					/>
					<Badge
						color="primary"
						size="medium"
						text={`${recipe.servingsNumber} servings`}
					/>
					{recipe.averageRating && (
						<Badge
							color="primary"
							size="medium"
							text={`${recipe.averageRating.toFixed(1)}`}
							icon={<HiOutlineStar />}
							iconLeft={false}
						/>
					)}
				</div>
				<div className="line-clamp-3 md:line-clamp-2 lg:line-clamp-5 sm:mb-8 xl:mb-12">
					{recipe.recipeSteps.map((step, index) => (
						<div
							key={index}
							className="hidden sm:block sm:mb-4 xl:mb-6"
						>
							<p className="text-p3 lg:text-p2 font-semibold text-grey-700 mb-2">
								{step.name}:
							</p>
							<ul>
								{step.stepBullets.map((bullet, bulletIndex) => (
									<li
										className="text-p4 lg:text-p3 text-grey-700 mb-1"
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
