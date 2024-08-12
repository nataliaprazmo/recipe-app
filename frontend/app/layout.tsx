import type { Metadata } from "next";
import "@/styles/globals.css";
import { lato, raleway } from "@/styles/fonts";

export const metadata: Metadata = {
	title: "Foodi App",
	description: "Share your recipes!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={`${raleway.variable} ${lato.variable} antialiased overflow-x-hidden bg-grey-100`}
			>
				{children}
			</body>
		</html>
	);
}
