import { CreateRecipeInput } from "../../types/recipe.types";

export function validateBasicFields(
	input: CreateRecipeInput,
	errors: string[]
): void {
	if (!input.name?.trim()) errors.push("Recipe name is required");
	else if (input.name.trim().length > 255)
		errors.push("Recipe name must be less than 255 characters");

	if (!input.photo?.trim()) errors.push("Recipe photo is required");

	if (!Number.isInteger(input.servingsNumber) || input.servingsNumber <= 0) {
		errors.push("Servings must be a positive integer");
	}

	if (
		input.preparationTime !== null &&
		input.preparationTime !== undefined &&
		(!Number.isInteger(input.preparationTime) || input.preparationTime < 0)
	) {
		errors.push("Preparation time must be a non-negative integer");
	}

	if (!["EASY", "MEDIUM", "HARD"].includes(input.difficultyLevel)) {
		errors.push("Invalid difficulty level");
	}
}
