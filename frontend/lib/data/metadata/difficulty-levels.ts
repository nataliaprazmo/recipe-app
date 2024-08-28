import { ENDPOINTS } from "@/lib/api/endpoints";
import { getFromEndpoint } from "@/lib/utils/fetching.utils";

export async function fetchDifficultyLevels() {
	try {
		return await getFromEndpoint(ENDPOINTS.METADATA.DIFFICULTY_LEVELS);
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch difficulty levels.");
	}
}
