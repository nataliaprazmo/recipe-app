import { FastifyInstance } from "fastify";
import { CreateIngredientInput } from "../types/ingredient.types";
import { Ingredient, PrismaClient } from "@prisma/client";
import { createIngredientController } from "../controllers/ingredient.controller";

export async function ingredientRoutes(fastify: FastifyInstance) {
	const prisma = new PrismaClient();
	const ingredientController = createIngredientController(prisma);

	fastify.post<{
		Body: CreateIngredientInput;
		Reply: Ingredient;
	}>("/", ingredientController.createIngredient.bind(ingredientController));

	fastify.post<{
		Body: CreateIngredientInput[];
		Reply: Ingredient[];
	}>(
		"/bulk",
		ingredientController.createManyIngredients.bind(ingredientController)
	);

	fastify.get<{
		Params: { id: string };
		Reply: Ingredient | { error: string };
	}>(
		"/:id",
		ingredientController.getIngredientById.bind(ingredientController)
	);

	fastify.get<{
		Params: { name: string };
		Reply: Ingredient | { error: string };
	}>(
		"/name/:name",
		ingredientController.getIngredientByName.bind(ingredientController)
	);

	fastify.post<{
		Body: { names: string[] };
		Reply: Ingredient[];
	}>(
		"/by-names",
		ingredientController.getIngredientsByNames.bind(ingredientController)
	);

	fastify.get<{
		Querystring: { limit?: number; offset?: number };
		Reply: Ingredient[];
	}>("/", ingredientController.getAllIngredients.bind(ingredientController));

	fastify.get<{
		Querystring: { q: string; limit?: number };
		Reply: Ingredient[];
	}>(
		"/search",
		ingredientController.searchIngredients.bind(ingredientController)
	);

	fastify.get<{
		Reply: { count: number };
	}>(
		"/count",
		ingredientController.getIngredientsCount.bind(ingredientController)
	);
}
