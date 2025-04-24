import { getFromEndpoint, searchFromEndpoint } from "@/lib/utils";
import { ENDPOINTS } from "../api/endpoints";
import { Ingredient } from "../types/data.types";

export async function fetchIngredients() {
	try {
		return await getFromEndpoint<Ingredient[]>(ENDPOINTS.INGREDIENTS.BASE);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch ingredients.");
	}
}

export async function searchIngredients(searchTerm: string) {
	try {
		return await searchFromEndpoint<Ingredient[]>(
			ENDPOINTS.INGREDIENTS.SEARCH,
			searchTerm
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch ingredients.");
	}
}
