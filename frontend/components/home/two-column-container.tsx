import { ReactNode } from "react";

interface TwoColumnContainerProps {
	id?: string;
	textLeft: boolean;
	children: ReactNode;
	className?: string;
}

const TwoColumnContainer: React.FC<TwoColumnContainerProps> = ({
	id,
	textLeft,
	children,
	className = "",
}) => {
	return (
		<section
			id={id}
			className={`flex justify-between items-center ${
				textLeft
					? "flex-col xl:flex-row"
					: "flex-col-reverse xl:flex-row-reverse"
			} px-6 sm:px-24 2xl:px-184 py-16 gap-6 sm:gap-8 xl:gap-0 ${className}`}
		>
			{children}
		</section>
	);
};

export default TwoColumnContainer;
