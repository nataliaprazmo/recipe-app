import {
	buildRecipeFilterQueryString,
	getFromEndpoint,
	getFromEndpointById,
} from "@/lib/utils";
import { ENDPOINTS } from "../api/endpoints";
import {
	BasicRecipe,
	Recipe,
	RecipeFilter,
	Comment,
} from "../types/data.types";

export async function fetchRecipes() {
	try {
		const data = await getFromEndpoint<{
			message: string;
			recipes: BasicRecipe[];
		}>(ENDPOINTS.RECIPES.BASE);
		return data.recipes;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipes.");
	}
}

export async function fetchRecipe(recipeId: string) {
	try {
		const data = await getFromEndpointById<{
			message: string;
			recipe: Recipe;
		}>(ENDPOINTS.RECIPES.BY_ID, recipeId);
		return data.recipe;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipe.");
	}
}

export async function fetchRecipeOfTheDay() {
	try {
		const data = await getFromEndpoint<{ message: string; recipe: Recipe }>(
			ENDPOINTS.RECIPES.OF_THE_DAY
		);
		return data.recipe;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipe of the day.");
	}
}

export async function fetchFilteredRecipes(filters: RecipeFilter) {
	try {
		const filteringEndpoint = buildRecipeFilterQueryString(filters);
		const data = await getFromEndpoint<{
			message: string;
			filteredRecipes: BasicRecipe[];
		}>(ENDPOINTS.RECIPES.FILTERED + "?" + filteringEndpoint);
		return data.filteredRecipes;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch filtered recipes.");
	}
}

export async function fetchRecipeComments(recipeId: string) {
	try {
		const data = await getFromEndpointById<{
			message: string;
			comments: Comment[];
		}>(ENDPOINTS.RECIPES.COMMENTS, recipeId);
		return data.comments;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipe's comments.");
	}
}
