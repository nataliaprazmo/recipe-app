import Image from "next/image";
import Pentacle from "./pentacle";

interface RecipePhotoProps {
	sizes: number;
	imageSrc: string;
	icon?: React.ReactNode;
}

export default function RecipePhoto({
	sizes,
	icon,
	imageSrc,
}: RecipePhotoProps) {
	const radius = 24;
	return (
		<>
			{icon ? (
				<div className="relative rounded-3xl aspect-square">
					<Pentacle
						size={sizes}
						radius={radius}
						imageSrc={imageSrc}
					/>
					<div className="absolute bottom-0 right-0 rounded-full aspect-square w-fit p-3 flex items-center justify-center shadow-e2 bg-primary-300 border-[0.5px] border-grey-200 text-primary-600 text-5xl">
						{icon}
					</div>
				</div>
			) : (
				<div
					className={`relative rounded-3xl aspect-square w-${sizes}px`}
				>
					<div
						className={`absolute top-0 left-0 bg-black bg-opacity-20 w-full aspect-square rounded-3xl w-${sizes}px`}
					/>
					<Image
						src={imageSrc}
						height={sizes}
						width={sizes}
						alt="Recipe photo"
						style={{
							objectFit: "cover",
						}}
						loading="lazy"
						className={`aspect-square rounded-3xl w-${sizes}px`}
					/>
				</div>
			)}
		</>
	);
}
