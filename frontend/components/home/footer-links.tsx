import Link from "next/link";
import { memo } from "react";

interface FooterLinksProps {
	title: string;
	texts?: string[];
	links?: {
		text: string;
		link: string;
	}[];
	icons?: React.ReactNode[];
}

function FooterLinks({ title, links, icons, texts }: FooterLinksProps) {
	return (
		<div className="flex flex-col gap-1 w-fit">
			<p className="text-p3 sm:text-p2 2xl:text-p1 text-grey-100 mb-1 2xl:mb-3 font-medium">
				{title}
			</p>
			{texts &&
				texts.map((text, index) => (
					<p
						key={index}
						className="text-grey-200 text-p5 sm:text-p4 2xl:text-p3"
					>
						{text}
					</p>
				))}
			{links &&
				links.map((link, index) => (
					<Link
						key={index}
						className="text-p5 sm:text-p4 2xl:text-p3 text-grey-200 hover:text-grey-100"
						href={link.link}
					>
						{link.text}
					</Link>
				))}
			{icons && (
				<div className="flex flex-row gap-4 2xl:gap-6">
					{icons.map((icon, index) => (
						<span key={index}>{icon}</span>
					))}
				</div>
			)}
		</div>
	);
}

export default memo(FooterLinks);
