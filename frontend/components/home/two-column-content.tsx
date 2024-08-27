import { memo } from "react";
import TwoColumnContainer from "./two-column-container";
import ContentText from "./content-text";
import ContentImage from "./content-image";

interface TwoColumnContentProps {
	id?: string;
	textLeft: boolean;
	title: string;
	text: string;
	buttonText: string;
	buttonLink: string;
	imageSrc: string;
	imageAlt?: string;
	imagePriority?: boolean;
	className?: string;
}

const TwoColumnContent: React.FC<TwoColumnContentProps> = memo(
	({
		id,
		textLeft,
		title,
		text,
		buttonText,
		buttonLink,
		imageSrc,
		imageAlt,
		imagePriority = false,
		className,
	}) => {
		return (
			<TwoColumnContainer
				id={id}
				textLeft={textLeft}
				className={className}
			>
				<ContentText
					title={title}
					text={text}
					buttonText={buttonText}
					buttonLink={buttonLink}
				/>
				<ContentImage
					imageSrc={imageSrc}
					alt={imageAlt}
					priority={imagePriority}
				/>
			</TwoColumnContainer>
		);
	}
);

TwoColumnContent.displayName = "TwoColumnContent";

export default TwoColumnContent;
