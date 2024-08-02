import { DifficultyLevel } from "@prisma/client";

export function getAllDifficultyLevels() {
	return Object.values(DifficultyLevel);
}
