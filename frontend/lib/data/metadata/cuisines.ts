import { ENDPOINTS } from "@/lib/api/endpoints";
import { Cuisine } from "@/lib/types/data.types";
import {
	getFromEndpoint,
	searchFromEndpoint,
} from "@/lib/utils/fetching.utils";

export async function fetchCuisines() {
	try {
		const data = await getFromEndpoint<{
			message: string;
			cuisines: Cuisine[];
		}>(ENDPOINTS.METADATA.CUISINES.BASE);
		return data.cuisines;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch cuisines.");
	}
}

export async function searchCuisines(searchTerm: string) {
	try {
		const data = await searchFromEndpoint<{
			message: string;
			results: Cuisine[];
			meta: { limit: number };
		}>(ENDPOINTS.METADATA.CUISINES.SEARCH, searchTerm);
		return data.results;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch cuisines.");
	}
}
