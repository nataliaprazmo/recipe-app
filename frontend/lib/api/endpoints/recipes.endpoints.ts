export const RECIPES_ENDPOINTS = {
	BASE: "/api/recipes",
	BY_ID: (id: string) => `/api/recipes/${id}`,
	OF_THE_DAY: "/api/recipes/of-the-day",
	TOGGLE_PRIVACY: (id: string) => `/api/recipes/toggle-privacy/${id}`,
	FILTERED: "/api/recipes/filtered",
	COMMENTS: (recipeId: string) => `/api/recipes/comments/${recipeId}`,
	RATINGS: {
		AVERAGE: (recipeId: string) =>
			`/api/recipes/ratings/${recipeId}/average`,
	},
} as const;
