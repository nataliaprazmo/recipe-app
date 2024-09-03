import { ENDPOINTS } from "@/lib/api/endpoints";
import { DifficultyLevel } from "@/lib/types/data.types";
import { getFromEndpoint } from "@/lib/utils/fetching.utils";

export async function fetchDifficultyLevels() {
	try {
		const data = await getFromEndpoint<{
			message: string;
			difficultyLevels: string[];
		}>(ENDPOINTS.METADATA.DIFFICULTY_LEVELS);
		return data.difficultyLevels;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch difficulty levels.");
	}
}
