export const USERS_ENDPOINTS = {
	BASE: "/users",
	ALL: "/users/all",
	BY_EMAIL: "/users/email",
	PASSWORD: "/users/password",
	RECIPES: {
		BASE: "/users/recipes",
		BY_USER: (userId: string) => `/users/recipes/${userId}`,
	},
	RATINGS: {
		BASE: "/users/ratings",
		BY_RECIPE: (recipeId: string) => `/users/ratings/${recipeId}`,
	},
	COMMENTS: {
		BASE: "/users/comments",
		BY_ID: (commentId: string) => `/users/comments/${commentId}`,
	},
	FAVORITES: {
		BASE: "/users/favorites",
		BY_RECIPE: (recipeId: string) => `/users/favorites/${recipeId}`,
	},
} as const;
