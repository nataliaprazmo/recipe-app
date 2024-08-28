import { ENDPOINTS } from "@/lib/api/endpoints";
import {
	getFromEndpoint,
	searchFromEndpoint,
} from "@/lib/utils/fetching.utils";

export async function fetchCategories() {
	try {
		return await getFromEndpoint(ENDPOINTS.METADATA.CATEGORIES.BASE);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch categories.");
	}
}

export async function searchCategories(searchTerm: string) {
	try {
		return await searchFromEndpoint(
			ENDPOINTS.METADATA.CATEGORIES.SEARCH,
			searchTerm
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch categories.");
	}
}
