import { ENDPOINTS } from "@/lib/api/endpoints";
import { MeasureUnit } from "@/lib/types/data.types";
import {
	getFromEndpoint,
	searchFromEndpoint,
} from "@/lib/utils/fetching.utils";

export async function fetchMeasureUnits() {
	try {
		return await getFromEndpoint<MeasureUnit[]>(
			ENDPOINTS.METADATA.CUISINES.BASE
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch measure units.");
	}
}

export async function searchMeasureUnits(searchTerm: string) {
	try {
		return await searchFromEndpoint<MeasureUnit[]>(
			ENDPOINTS.METADATA.CUISINES.SEARCH,
			searchTerm
		);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch measure units.");
	}
}
