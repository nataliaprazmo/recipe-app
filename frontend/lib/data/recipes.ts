import {
	getFromEndpoint,
	getFromEndpointById,
} from "@/lib/utils/fetching.utils";
import { ENDPOINTS } from "../api/endpoints";
import {
	BasicRecipe,
	Recipe,
	RecipeFilter,
	Comment,
} from "../types/data.types";

export async function fetchRecipes() {
	try {
		return await getFromEndpoint<BasicRecipe[]>(ENDPOINTS.RECIPES.BASE);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipes.");
	}
}

export async function fetchRecipe(recipeId: string) {
	try {
		return await getFromEndpointById<Recipe>(
			ENDPOINTS.RECIPES.BY_ID,
			recipeId
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipe.");
	}
}

export async function fetchRecipeOfTheDay() {
	try {
		return await getFromEndpoint<BasicRecipe>(ENDPOINTS.RECIPES.OF_THE_DAY);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipe of the day.");
	}
}

// export async function searchRecipes(filters: RecipeFilter) {}

export async function fetchRecipeComments(recipeId: string) {
	try {
		return await getFromEndpointById<Comment[]>(
			ENDPOINTS.RECIPES.COMMENTS,
			recipeId
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipe's comments.");
	}
}

export async function fetchRecipeAverageRating(recipeId: string) {
	try {
		return await getFromEndpointById<number>(
			ENDPOINTS.RECIPES.RATINGS.AVERAGE,
			recipeId
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipe's average rating.");
	}
}
