import { ButtonStyleConfig } from "@/lib/types/button.types";

export const buttonStyles: ButtonStyleConfig = {
	variant: {
		outlined:
			"border-2 focus:outline-none focus:ring-2 focus:ring-offset-0",
		filled: "border focus:outline-none focus:ring-2 focus:ring-offset-0",
		text: "border-0 focus:outline-none focus:ring-0 focus:ring-offset-0",
	},

	color: {
		primary: {
			filled: {
				normal: "border-primary-500 text-grey-800 bg-primary-500 hover:bg-primary-600 active:bg-primary-400",
				disabled: "bg-primary-200 text-grey-200",
			},
			outlined: {
				normal: "border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100",
				disabled: "bg-grey-100 border-primary-200 text-grey-200",
			},
			text: {
				normal: "text-primary-500 hover:text-primary-600 active:text-primary-400",
				disabled: "text-primary-200",
			},
		},

		secondary: {
			filled: {
				normal: "border-grey-700 text-grey-100 bg-grey-700 hover:bg-grey-500 active:bg-grey-700",
				disabled: "bg-grey-200 text-grey-100",
			},
			outlined: {
				normal: "border-grey-700 text-grey-700 hover:bg-grey-50 active:bg-grey-100",
				disabled: "bg-grey-100 border-grey-200 text-grey-200",
			},
			text: {
				normal: "text-grey-800 hover:text-grey-700 active:text-grey-600",
				disabled: "text-grey-200",
			},
		},

		dark: {
			filled: {
				normal: "border-grey-100 bg-grey-100 text-grey-800 hover:bg-grey-300 active:bg-grey-200",
				disabled: "bg-grey-600 text-grey-500",
			},
			outlined: {
				normal: "border-grey-100 text-grey-100 bg-grey-800 hover:bg-grey-700 active:bg-grey-900",
				disabled: "bg-grey-800 border-grey-600 text-grey-600",
			},
			text: {
				normal: "text-grey-100 hover:text-grey-200 active:text-grey-300",
				disabled: "text-grey-600",
			},
		},
	},

	size: {
		large: "text-p4 px-7 py-2.5 gap-2 md:text-p3 md:px-8 md:py-2.5 xl:px-10 xl:py-3 xl:text-p2 xl:gap-4",
		medium: "xl:text-p3 xl:px-8 xl:py-2.5 text-p5 md:px-6 px-5 py-2 gap-2",
		small: "text-p6 px-4 md:text-p5 md:px-5 md:py-1.5 py-1 gap-2",
	},
};

export const baseClasses =
	"flex flex-row items-center justify-center rounded-full font-bold transition-all duration-200 ease-in-out";

export const getShadowClasses = (variant: string, size: string): string => {
	if (variant === "text") return "";

	return size === "large" ? "shadow-e2" : "shadow-e1";
};

export const getFocusClasses = (color: string): string => {
	switch (color) {
		case "primary":
			return "focus:ring-primary-500";
		case "secondary":
			return "focus:ring-grey-500";
		case "dark":
			return "focus:ring-grey-800";
		default:
			return "focus:ring-primary-500";
	}
};
