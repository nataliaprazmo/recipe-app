import { ENDPOINTS } from "@/lib/api/endpoints";
import { Category } from "@/lib/types/data.types";
import { getFromEndpoint, searchFromEndpoint } from "@/lib/utils";

export async function fetchCategories() {
	try {
		const data = await getFromEndpoint<{
			message: string;
			categories: Category[];
		}>(ENDPOINTS.METADATA.CATEGORIES.BASE);

		return data.categories;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch categories.");
	}
}

export async function searchCategories(searchTerm: string) {
	try {
		const data = await searchFromEndpoint<{
			message: string;
			results: Category[];
			meta: { limit: number };
		}>(ENDPOINTS.METADATA.CATEGORIES.SEARCH, searchTerm);
		return data.results;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch categories.");
	}
}
