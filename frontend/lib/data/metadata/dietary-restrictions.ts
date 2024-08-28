import { ENDPOINTS } from "@/lib/api/endpoints";
import {
	getFromEndpoint,
	searchFromEndpoint,
} from "@/lib/utils/fetching.utils";

export async function fetchDietaryRestrictions() {
	try {
		return await getFromEndpoint(
			ENDPOINTS.METADATA.DIETARY_RESTRICTIONS.BASE
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch dietary restrictions.");
	}
}

export async function searchDietaryRestrictions(searchTerm: string) {
	try {
		return await searchFromEndpoint(
			ENDPOINTS.METADATA.DIETARY_RESTRICTIONS.SEARCH,
			searchTerm
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch dietary restrictions.");
	}
}
