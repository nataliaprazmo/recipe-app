import {
	getFromEndpoint,
	searchFromEndpoint,
} from "@/lib/utils/fetching.utils";
import { ENDPOINTS } from "../api/endpoints";

export async function fetchIngredients() {
	try {
		return await getFromEndpoint(ENDPOINTS.INGREDIENTS.BASE);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch ingredients.");
	}
}

export async function searchIngredients(searchTerm: string) {
	try {
		return await searchFromEndpoint(
			ENDPOINTS.INGREDIENTS.SEARCH,
			searchTerm
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch ingredients.");
	}
}
