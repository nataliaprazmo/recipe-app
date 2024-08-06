import { FastifyInstance } from "fastify";
import {
	BasicRecipe,
	CreateRecipeInput,
	FullRecipe,
	UpdateRecipeInput,
} from "../types/recipe.types";
import { createRecipeController } from "../controllers/recipe.controller";

export async function recipeRoutes(fastify: FastifyInstance) {
	const recipeController = createRecipeController(fastify.prisma);

	fastify.post<{
		Body: CreateRecipeInput;
		Reply: FullRecipe;
	}>(
		"/",
		{ preHandler: [fastify.auth] },
		recipeController.createRecipe.bind(recipeController)
	);

	fastify.get<{
		Params: { id: string };
		Reply: FullRecipe | { error: string };
	}>(
		"/:id",
		{ preHandler: [fastify.auth] },
		recipeController.getRecipeById.bind(recipeController)
	);

	fastify.get<{
		Reply: { message: string; recipe: BasicRecipe } | { error: string };
	}>(
		"/of-the-day",
		recipeController.getRecipeOfTheDay.bind(recipeController)
	);

	fastify.get<{
		Querystring: { limit?: number; offset?: number };
		Reply: BasicRecipe[];
	}>("/", recipeController.getPublicRecipes.bind(recipeController));

	fastify.put<{
		Params: { id: string };
		Reply: BasicRecipe;
	}>(
		"/toggle-privacy/:recipeId",
		{ preHandler: [fastify.auth] },
		recipeController.toggleRecipePrivacy.bind(recipeController)
	);

	fastify.put<{
		Params: { id: string };
		Body: UpdateRecipeInput;
		Reply: FullRecipe;
	}>(
		"/:id",
		{ preHandler: [fastify.auth] },
		recipeController.updateRecipe.bind(recipeController)
	);

	fastify.delete<{
		Params: { id: string };
	}>(
		"/:id",
		{ preHandler: [fastify.auth] },
		recipeController.deleteRecipe.bind(recipeController)
	);
}
