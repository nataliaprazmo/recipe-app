import { Lato } from "next/font/google";
import { Raleway } from "next/font/google";

export const lato = Lato({
	subsets: ["latin"],
	weight: "700",
	variable: "--font-lato",
});

export const raleway = Raleway({
	subsets: ["latin"],
	variable: "--font-raleway",
});
