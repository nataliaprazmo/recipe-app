import Image from "next/image";
import Pentacle from "./pentacle";
import Link from "next/link";

interface RecipePhotoProps {
	imageSrc: string;
	recipeId: string;
	icon?: React.ReactNode;
}

export default function RecipePhoto({
	imageSrc,
	recipeId,
	icon,
}: RecipePhotoProps) {
	return (
		<>
			{icon ? (
				<div className="relative rounded-2xl aspect-square w-full">
					<Pentacle recipeId={recipeId} imageSrc={imageSrc} />
					<div className="absolute bottom-0 right-0 rounded-full aspect-square w-20 h-20 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center shadow-e2 bg-primary-300 border-[0.5px] border-grey-200 text-primary-600 text-4xl sm:text-3xl md:text-4xl">
						{icon}
					</div>
				</div>
			) : (
				<Link
					href={`/recipe/${recipeId}`}
					className="relative rounded-2xl aspect-square w-full border border-grey-200 hover:scale-105 transition-all"
				>
					<div className="absolute top-0 left-0 bg-black bg-opacity-20 w-full aspect-square rounded-2xl" />
					<Image
						src={imageSrc}
						fill
						alt="Recipe photo"
						style={{
							objectFit: "cover",
						}}
						loading="lazy"
						className="aspect-square rounded-2xl"
					/>
				</Link>
			)}
		</>
	);
}
