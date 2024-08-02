export class IngredientNormalizer {
	MAX_INGREDIENT_NAME_LENGTH = 100;

	normalizeIngredientName(name: string): string {
		return name.trim().toLowerCase();
	}

	validateIngredientName(name: string): boolean {
		const trimmed = name.trim();
		return (
			trimmed.length > 0 &&
			trimmed.length <= this.MAX_INGREDIENT_NAME_LENGTH
		);
	}

	sanitizeIngredientName(name: string): string {
		return name.trim().replace(/\s+/g, " ").toLowerCase();
	}

	formatIngredientNameForDisplay(name: string): string {
		return name
			.trim()
			.toLowerCase()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	}
}
