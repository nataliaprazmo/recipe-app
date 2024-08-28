export const USERS_ENDPOINTS = {
	BASE: "/api/users",
	ALL: "/api/users/all",
	BY_EMAIL: "/api/users/email",
	PASSWORD: "/api/users/password",
	RECIPES: {
		BASE: "/api/users/recipes",
		BY_USER: (userId: string) => `/api/users/recipes/${userId}`,
	},
	RATINGS: {
		BASE: "/api/users/ratings",
		BY_RECIPE: (recipeId: string) => `/api/users/ratings/${recipeId}`,
	},
	COMMENTS: {
		BASE: "/api/users/comments",
		BY_ID: (commentId: string) => `/api/users/comments/${commentId}`,
	},
	FAVORITES: {
		BASE: "/api/users/favorites",
		BY_RECIPE: (recipeId: string) => `/api/users/favorites/${recipeId}`,
	},
} as const;
