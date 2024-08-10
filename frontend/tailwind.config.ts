import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontSize: {
				32: "2rem",
				64: "4rem",
				p1: ["2rem", { lineHeight: "2.5rem" }],
				p2: ["1.5rem", { lineHeight: "1.875rem" }],
				p3: ["1.25rem", { lineHeight: "1.56rem" }],
				p4: ["1rem", { lineHeight: "1.25rem" }],
				p5: [
					"0.875rem",
					{ lineHeight: "1.3rem", letterSpacing: "0.01em" },
				],
				p6: [
					"0.75rem",
					{ lineHeight: "1.3rem", letterSpacing: "0.015em" },
				],
				h1: [
					"6rem",
					{ lineHeight: "5.875rem", letterSpacing: "-0.02em" },
				],
				h2: ["4rem", { lineHeight: "4rem", letterSpacing: "-0.015em" }],
				h3: ["3rem", { lineHeight: "3rem", letterSpacing: "-0.01em" }],
				h4: [
					"2rem",
					{ lineHeight: "2.375rem", letterSpacing: "-0.005em" },
				],
			},
			colors: {
				primary: {
					200: "#f0fdec",
					300: "#d5f9c8",
					400: "#84df5d",
					500: "#5fd12e",
					600: "#4da229",
					700: "#39721c",
					800: "#213f08",
				},
				grey: {
					100: "#f3f2f2",
					200: "#b9b7b7",
					300: "#d7d5d5",
					400: "#9b9797",
					500: "#777373",
					600: "#595555",
					700: "#393737",
					800: "#1b1919",
				},
			},
			spacing: {
				18: "4.5rem",
				184: "11.5rem",
				r20: "20rem",
				r24: "24rem",
				r28: "28rem",
				r32: "32rem",
			},
			borderRadius: {
				"4xl": "3rem",
				lg: "var(--radius)",
				md: "calc(var(--radius) - 0.125rem)",
				sm: "calc(var(--radius) - 0.25rem)",
			},
			screens: {
				xxs: "22.5rem",
				xs: "29.7rem",
				"3xl": "112.5rem",
			},
			boxShadow: {
				e1: `0px 2px 6px 2px rgba(0, 0, 0, 0.15),
					0px 1px 2px 0px rgba(0, 0, 0, 0.3),
					inset 0px 2px 1px 0px rgba(255, 255, 255, 0.75)`,
				e2: `0px 4px 8px 3px rgba(0, 0, 0, 0.15),
					0px 1px 3px 0px rgba(0, 0, 0, 0.3),
					inset 0px 2px 1px 0px rgba(255, 255, 255, 0.75)`,
				s1: `0px 2px 6px 1px rgba(0, 0, 0, 0.15),
					0px 1px 2px 0px rgba(0, 0, 0, 0.3)`,
				s2: `0px 4px 8px 1px rgba(0, 0, 0, 0.3),
					0px 2px 6px 0px rgba(0, 0, 0, 0.15)`,
				is1: `inset 2px 2px 2px 0px rgba(0, 0, 0, 0.3)`,
				err: `0px 3px 6px 1px rgba(220, 38, 38, 0.15),
					0px 4px 8px 0px rgba(220, 38, 38, 0.3)`,
			},
		},
	},
	plugins: [],
};
export default config;
