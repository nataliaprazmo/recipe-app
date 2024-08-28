import {
	getFromEndpoint,
	getFromEndpointById,
} from "@/lib/utils/fetching.utils";
import { ENDPOINTS } from "../api/endpoints";
import { BasicRecipe, Rating, User } from "../types/data.types";

export async function fetchUser() {
	try {
		return await getFromEndpoint<User>(ENDPOINTS.USERS.BASE);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user.");
	}
}

export async function fetchUsers() {
	try {
		return await getFromEndpoint<User[]>(ENDPOINTS.USERS.ALL);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch users.");
	}
}

export async function fetchCurrentUserRecipes() {
	try {
		return await getFromEndpoint<BasicRecipe[]>(
			ENDPOINTS.USERS.RECIPES.BASE
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user's recipes.");
	}
}

export async function fetchUserRecipes(userId: string) {
	try {
		return await getFromEndpointById<BasicRecipe[]>(
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
		return await getFromEndpointById<Rating>(
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
		return await getFromEndpoint<Comment[]>(ENDPOINTS.USERS.COMMENTS.BASE);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch user's comments.");
	}
}

export async function fetchUserFavourites() {
	try {
		return await getFromEndpoint<BasicRecipe[]>(
			ENDPOINTS.USERS.FAVORITES.BASE
		);
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
