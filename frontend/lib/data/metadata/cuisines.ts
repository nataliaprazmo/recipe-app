import { ENDPOINTS } from "@/lib/api/endpoints";
import {
	getFromEndpoint,
	searchFromEndpoint,
} from "@/lib/utils/fetching.utils";

export async function fetchCuisines() {
	try {
		return await getFromEndpoint(ENDPOINTS.METADATA.CUISINES.BASE);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch cuisines.");
	}
}

export async function searchCuisines(searchTerm: string) {
	try {
		const cuisines = await searchFromEndpoint(
			ENDPOINTS.METADATA.CUISINES.SEARCH,
			searchTerm
		);
		return cuisines;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch cuisines.");
	}
}
