import { HiOutlineClock, HiOutlineStar } from "react-icons/hi2";
import Badge from "../badge";
import RecipePhoto from "./recipe-photo";
import { BasicRecipe } from "@/lib/types/data.types";

interface RecipeThumbnailProps {
	icon?: React.ReactNode;
	recipe: BasicRecipe;
	className?: string;
}

export default function RecipeThumbnail({
	icon,
	recipe,
	className,
}: RecipeThumbnailProps) {
	const hours = Math.floor(recipe.preparationTime / 60);
	const minutes = recipe.preparationTime % 60;
	return (
		<div
			className={`flex flex-col items-start justify-start w-full ${
				className || ""
			}`}
		>
			{!icon && <RecipePhoto imageSrc={recipe.photo} />}
			{icon && <RecipePhoto imageSrc={recipe.photo} icon={icon} />}
			<p className="text-p5 sm:text-p3 xl:text-p2 text-grey-800 mt-6 mb-3 font-bold w-full">
				{recipe.name}
			</p>
			<div className="flex flex-row flex-wrap gap-x-2 gap-y-1 w-full">
				{recipe.preparationTime && (
					<Badge
						color="secondary"
						size="small"
						text={`${hours ? hours + "h " : ""} ${
							minutes ? minutes + "min" : ""
						}`}
						icon={<HiOutlineClock />}
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
