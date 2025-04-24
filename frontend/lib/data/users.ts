import { getFromEndpoint, getFromEndpointById } from "@/lib/utils";
import { ENDPOINTS } from "../api/endpoints";
import { BasicRecipe, Rating, User } from "../types/data.types";

export async function fetchUser() {
	try {
		const data = await getFromEndpoint<{ message: string; user: User }>(
			ENDPOINTS.USERS.BASE
		);
		return data.user;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user.");
	}
}

export async function fetchUsers() {
	try {
		const data = await getFromEndpoint<{ message: string; users: User[] }>(
			ENDPOINTS.USERS.ALL
		);
		return data.users;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch users.");
	}
}

export async function fetchCurrentUserRecipes() {
	try {
		const data = await getFromEndpoint<{
			message: string;
			recipes: BasicRecipe[];
		}>(ENDPOINTS.USERS.RECIPES.BASE);
		return data.recipes;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user's recipes.");
	}
}

export async function fetchUserRecipes(userId: string) {
	try {
		const data = await getFromEndpointById<{
			message: string;
			recipes: BasicRecipe[];
		}>(ENDPOINTS.USERS.RECIPES.BY_USER, userId);
		return data.recipes;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user's recipes.");
	}
}

export async function fetchUserRatingForRecipe(recipeId: string) {
	try {
		const data = await getFromEndpointById<{
			message: string;
			rating: Rating;
		}>(ENDPOINTS.USERS.RATINGS.BY_RECIPE, recipeId);
		return data.rating;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user's recipe rating.");
	}
}

export async function fetchUserComments() {
	try {
		const data = await getFromEndpoint<{
			message: string;
			comments: Comment[];
		}>(ENDPOINTS.USERS.COMMENTS.BASE);
		return data.comments;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user's comments.");
	}
}

export async function fetchUserFavourites() {
	try {
		const data = await getFromEndpoint<{
			message: string;
			favourites: BasicRecipe[];
		}>(ENDPOINTS.USERS.FAVORITES.BASE);
		return data.favourites;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user's favourited recipes.");
	}
}

export async function fetchUserIsFavouriteRecipe(recipeId: string) {
	try {
		return await getFromEndpointById<boolean>(
			ENDPOINTS.USERS.FAVORITES.BY_RECIPE,
			recipeId
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipe favourited status.");
	}
}
