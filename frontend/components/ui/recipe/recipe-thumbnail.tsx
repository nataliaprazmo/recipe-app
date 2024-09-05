import { HiOutlineClock, HiOutlineStar } from "react-icons/hi2";
import Badge from "../badge";
import RecipePhoto from "./recipe-photo";
import { BasicRecipe, DifficultyLevel } from "@/lib/types/data.types";

interface RecipeThumbnailProps {
	size: "small" | "medium" | "big" | "large";
	icon?: React.ReactNode;
	recipe: BasicRecipe;
}

export default function RecipeThumbnail({
	size,
	icon,
	recipe,
}: RecipeThumbnailProps) {
	const hours = Math.floor(recipe.preparationTime / 60);
	const minutes = recipe.preparationTime % 60;
	const sizes =
		size === "small"
			? 224
			: size === "medium"
			? 256
			: size === "big"
			? 285
			: 300;
	return (
		<div
			className={`flex flex-col items-start justify-start w-[${sizes}px]`}
		>
			{!icon && <RecipePhoto sizes={sizes} imageSrc={recipe.photo} />}
			{icon && (
				<RecipePhoto
					sizes={sizes}
					imageSrc={recipe.photo}
					icon={icon}
				/>
			)}
			<p
				className={`text-p2 text-grey-800 mt-6 mb-3 font-bold w-[${sizes}px]`}
			>
				{recipe.name}
			</p>
			<div
				className={`flex flex-row flex-wrap gap-x-2 gap-y-1 w-[${sizes}px]`}
			>
				{recipe.preparationTime && (
					<Badge
						color="secondary"
						size="small"
						text={`${hours ? hours + "h " : ""} ${
							minutes ? minutes + "min" : ""
						}`}
						icon={
							<HiOutlineClock className="text-xs sm:text-base xl:text-xl text-grey-600 stroke-1" />
						}
					/>
				)}
				{recipe.difficultyLevel && (
					<Badge
						color="secondary"
						size="small"
						text={recipe.difficultyLevel.toLowerCase()}
					/>
				)}
				{recipe.servingsNumber && (
					<Badge
						color="secondary"
						size="small"
						text={`${recipe.servingsNumber} servings`}
					/>
				)}
				{recipe.averageRating && (
					<Badge
						color="secondary"
						size="small"
						text={`${recipe.averageRating.toFixed(1)}`}
						icon={
							<HiOutlineStar className="text-xs sm:text-base xl:text-xl text-grey-600 stroke-1" />
						}
						iconLeft={false}
					/>
				)}
			</div>
		</div>
	);
}
