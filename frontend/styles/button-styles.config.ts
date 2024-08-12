import { ButtonStyleConfig } from "@/types/button.types";

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
		large: "text-p3 px-8 py-3 gap-2 md:text-p2 md:px-10 md:py-3 md:gap-2 xl:text-p1 xl:px-12 xl:py-4 xl:gap-4",
		medium: "md:text-p3 md:px-9 md:py-3 text-p4 px-8 py-2.5 gap-3",
		small: "text-p4 px-6 py-2.5 gap-2",
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
