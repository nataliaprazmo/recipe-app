export const RECIPES_ENDPOINTS = {
	BASE: "/recipes",
	BY_ID: (id: string) => `/recipes/${id}`,
	OF_THE_DAY: "/recipes/of-the-day",
	TOGGLE_PRIVACY: (id: string) => `/recipes/toggle-privacy/${id}`,
	FILTERED: "/recipes/filtered",
	COMMENTS: (recipeId: string) => `/recipes/comments/${recipeId}`,
} as const;
