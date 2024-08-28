import {
	getFromEndpoint,
	getFromEndpointById,
} from "@/lib/utils/fetching.utils";
import { ENDPOINTS } from "../api/endpoints";

export async function fetchUser() {
	try {
		return await getFromEndpoint(ENDPOINTS.USERS.BASE);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user.");
	}
}

export async function fetchUsers() {
	try {
		return await getFromEndpoint(ENDPOINTS.USERS.ALL);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch users.");
	}
}

export async function fetchCurrentUserRecipes() {
	try {
		return await getFromEndpoint(ENDPOINTS.USERS.RECIPES.BASE);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user's recipes.");
	}
}

export async function fetchUserRecipes(userId: string) {
	try {
		return await getFromEndpointById(
			ENDPOINTS.USERS.RECIPES.BY_USER,
			userId
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user's recipes.");
	}
}

export async function fetchUserRatingForRecipe(recipeId: string) {
	try {
		return await getFromEndpointById(
			ENDPOINTS.USERS.RATINGS.BY_RECIPE,
			recipeId
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user's recipe rating.");
	}
}

export async function fetchUserComments() {
	try {
		return await getFromEndpoint(ENDPOINTS.USERS.COMMENTS.BASE);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user's comments.");
	}
}

export async function fetchUserFavourites() {
	try {
		return await getFromEndpoint(ENDPOINTS.USERS.FAVORITES.BASE);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user's favourited recipes.");
	}
}

export async function fetchUserIsFavouriteRecipe(recipeId: string) {
	try {
		return await getFromEndpointById(
			ENDPOINTS.USERS.FAVORITES.BY_RECIPE,
			recipeId
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipe favourited status.");
	}
}
