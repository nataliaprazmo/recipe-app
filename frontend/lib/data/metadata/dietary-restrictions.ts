import { ENDPOINTS } from "@/lib/api/endpoints";
import { DietaryRestriction } from "@/lib/types/data.types";
import {
	getFromEndpoint,
	searchFromEndpoint,
} from "@/lib/utils/fetching.utils";

export async function fetchDietaryRestrictions() {
	try {
		return await getFromEndpoint<DietaryRestriction[]>(
			ENDPOINTS.METADATA.DIETARY_RESTRICTIONS.BASE
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch dietary restrictions.");
	}
}

export async function searchDietaryRestrictions(searchTerm: string) {
	try {
		return await searchFromEndpoint<DietaryRestriction[]>(
			ENDPOINTS.METADATA.DIETARY_RESTRICTIONS.SEARCH,
			searchTerm
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch dietary restrictions.");
	}
}
