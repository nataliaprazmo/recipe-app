import { ENDPOINTS } from "@/lib/api/endpoints";
import { DietaryRestriction } from "@/lib/types/data.types";
import { getFromEndpoint, searchFromEndpoint } from "@/lib/utils";

export async function fetchDietaryRestrictions() {
	try {
		const data = await getFromEndpoint<{
			message: string;
			dietaryRestrictions: DietaryRestriction[];
		}>(ENDPOINTS.METADATA.DIETARY_RESTRICTIONS.BASE);
		return data.dietaryRestrictions;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch dietary restrictions.");
	}
}

export async function searchDietaryRestrictions(searchTerm: string) {
	try {
		const data = await searchFromEndpoint<{
			message: string;
			results: DietaryRestriction[];
			meta: { limit: number };
		}>(ENDPOINTS.METADATA.DIETARY_RESTRICTIONS.SEARCH, searchTerm);
		return data.results;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch dietary restrictions.");
	}
}
