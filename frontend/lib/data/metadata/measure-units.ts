import { ENDPOINTS } from "@/lib/api/endpoints";
import { MeasureUnit } from "@/lib/types/data.types";
import { getFromEndpoint, searchFromEndpoint } from "@/lib/utils";

export async function fetchMeasureUnits() {
	try {
		const data = await getFromEndpoint<{
			message: string;
			measureUnits: MeasureUnit[];
		}>(ENDPOINTS.METADATA.MEASURE_UNITS.BASE);
		return data.measureUnits;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch measure units.");
	}
}

export async function searchMeasureUnits(searchTerm: string) {
	try {
		const data = await searchFromEndpoint<{
			message: string;
			results: MeasureUnit[];
			meta: { limit: number };
		}>(ENDPOINTS.METADATA.MEASURE_UNITS.SEARCH, searchTerm);
		return data.results;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch measure units.");
	}
}
