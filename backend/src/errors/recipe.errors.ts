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
