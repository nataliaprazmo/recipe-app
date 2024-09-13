import Button from "../ui/button";

interface ContentTextProps {
	title: string;
	text: string;
	buttonText: string;
	buttonLink: string;
	className?: string;
}

const ContentText: React.FC<ContentTextProps> = ({
	title,
	text,
	buttonText,
	buttonLink,
	className = "",
}) => {
	return (
		<div
			className={`flex flex-col gap-2 xl:gap-4 items-start w-full xl:w-4/12 ${className}`}
		>
			<h3 className="text-p2 max-w-header font-lato sm:text-h4 xl:text-h3 text-grey-800 font-bold md:mb-2">
				{title}
			</h3>
			<p className="text-p5 sm:text-p3 text-grey-700 font-medium max-w-prose mb-3 md:mb-6">
				{text}
			</p>
			<Button
				variant="filled"
				color="secondary"
				size="medium"
				text={buttonText}
				link={buttonLink}
				additionalclasses="xl:text-p2 xl:px-12 xl:py-4 xl:gap-4 xl:shadow-e1"
			/>
		</div>
	);
};

export default ContentText;
