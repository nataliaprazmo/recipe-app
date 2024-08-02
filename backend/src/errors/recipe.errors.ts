export class ValidationError extends Error {
	constructor(public errors: string[]) {
		super(`Validation failed: ${errors.join(", ")}`);
		this.name = "ValidationError";
	}
}

export class RecipeNotFoundError extends Error {
	constructor(recipeId: string) {
		super(`Recipe with id ${recipeId} not found`);
		this.name = "RecipeNotFoundError";
	}
}

export class RecipeAccessDeniedError extends Error {
	constructor(recipeId: string) {
		super(`Access denied to recipe ${recipeId}`);
		this.name = "RecipeAccessDeniedError";
	}
}
