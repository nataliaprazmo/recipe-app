import { CreateIngredientInput } from "../../types/ingredient.types";

export function validateIngredients(
	ingredients: CreateIngredientInput[],
	errors: string[]
): void {
	if (!ingredients || ingredients.length === 0) {
		errors.push("At least one ingredient is required");
		return;
	}

	ingredients.forEach((ingredient, index) => {
		const position = index + 1;

		if (!ingredient.name?.trim()) {
			errors.push(`Ingredient ${position}: name is required`);
		} else if (ingredient.name.trim().length > 255) {
			errors.push(
				`Ingredient ${position}: name must be less than 255 characters`
			);
		}

		if (ingredient.amount !== undefined && ingredient.amount !== null) {
			if (
				typeof ingredient.amount !== "number" ||
				ingredient.amount <= 0
			) {
				errors.push(
					`Ingredient ${position}: amount must be a positive number`
				);
			}
		}
	});

	const names = ingredients
		.map((i) => i.name?.trim().toLowerCase())
		.filter(Boolean);
	const unique = new Set(names);
	if (unique.size !== names.length) {
		errors.push("Duplicate ingredient names found");
	}
}
