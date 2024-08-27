import Image from "next/image";
import { memo, Suspense } from "react";
import ImageSkeleton from "../skeletons/image-skeleton";

interface ContentImageProps {
	imageSrc: string;
	alt?: string;
	className?: string;
	priority?: boolean;
}

const ContentImage: React.FC<ContentImageProps> = memo(
	({ imageSrc, alt = "Content image", className = "", priority = false }) => {
		return (
			<div className={`w-full xl:w-7/12 ${className}`}>
				<Suspense fallback={<ImageSkeleton />}>
					<Image
						src={imageSrc}
						alt={alt}
						height={500}
						width={895}
						style={{
							objectFit: "contain",
							width: "100%",
							height: "auto",
						}}
						loading={priority ? undefined : "lazy"}
						priority={priority}
						className="rounded-3xl lg:rounded-4xl shadow-s2"
					/>
				</Suspense>
			</div>
		);
	}
);

ContentImage.displayName = "ContentImage";

export default ContentImage;
