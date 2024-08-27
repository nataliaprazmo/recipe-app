"use client";

import { useScrollEffect } from "@/hooks/use-scroll-effect";
import Logo from "../ui/logo";

export default function NavContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	const isScrolled = useScrollEffect();
	return (
		<div
			className={`fixed z-50 top-0 left-0 w-full px-6 sm:px-24 2xl:px-184 py-3 lg:py-4 2xl:py-6 flex flex-row justify-between items-center transition-all duration-300 ease-in-out bg-grey-100 shadow-s1 ${
				isScrolled
					? "bg-grey-100/90 backdrop-blur-md shadow-s1"
					: "bg-transparent"
			}`}
		>
			<Logo dark={!isScrolled} />
			{children}
		</div>
	);
}
