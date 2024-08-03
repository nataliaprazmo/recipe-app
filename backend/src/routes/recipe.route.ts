import { FastifyInstance } from "fastify";
import {
	BasicRecipe,
	CreateRecipeInput,
	FullRecipe,
	UpdateRecipeInput,
} from "../types/recipe.types";
import { PrismaClient } from "@prisma/client";
import { createRecipeController } from "../controllers/recipe.controller";

export async function recipeRoutes(fastify: FastifyInstance) {
	const prisma = new PrismaClient();
	const recipeController = createRecipeController(prisma);

	fastify.post<{
		Body: CreateRecipeInput;
		Reply: FullRecipe;
	}>("/", {}, recipeController.createRecipe.bind(recipeController));

	fastify.get<{
		Params: { id: string };
		Reply: FullRecipe | { error: string };
	}>("/:id", recipeController.getRecipeById.bind(recipeController));

	fastify.get<{
		Params: { userId: string };
		Querystring: { includePrivate?: boolean };
		Reply: BasicRecipe[];
	}>(
		"/users/:userId/recipes",
		recipeController.getRecipesByUser.bind(recipeController)
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
	}>("/public", recipeController.getPublicRecipes.bind(recipeController));

	fastify.put<{
		Params: { id: string };
		Reply: BasicRecipe;
	}>(
		"/toggle-privacy/:recipeId",
		{},
		recipeController.toggleRecipePrivacy.bind(recipeController)
	);

	fastify.put<{
		Params: { id: string };
		Body: UpdateRecipeInput;
		Reply: FullRecipe;
	}>("/:id", {}, recipeController.updateRecipe.bind(recipeController));

	fastify.delete<{
		Params: { id: string };
	}>("/:id", {}, recipeController.deleteRecipe.bind(recipeController));
}
