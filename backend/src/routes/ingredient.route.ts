import { FastifyInstance } from "fastify";
import { CreateIngredientInput } from "../types/ingredient.types";
import { Ingredient } from "@prisma/client";
import { createIngredientController } from "../controllers/ingredient.controller";

export async function ingredientRoutes(fastify: FastifyInstance) {
	const ingredientController = createIngredientController(fastify.prisma);

	fastify.post<{
		Body: CreateIngredientInput;
		Reply: Ingredient;
	}>(
		"/",
		{ preHandler: [fastify.auth] },
		ingredientController.createIngredient.bind(ingredientController)
	);

	fastify.post<{
		Body: CreateIngredientInput[];
		Reply: Ingredient[];
	}>(
		"/bulk",
		{ preHandler: [fastify.auth] },
		ingredientController.createManyIngredients.bind(ingredientController)
	);

	fastify.get<{
		Params: { id: string };
		Reply: Ingredient | { error: string };
	}>(
		"/:id",
		{ preHandler: [fastify.auth] },
		ingredientController.getIngredientById.bind(ingredientController)
	);

	fastify.get<{
		Params: { name: string };
		Reply: Ingredient | { error: string };
	}>(
		"/name/:name",
		{ preHandler: [fastify.auth] },
		ingredientController.getIngredientByName.bind(ingredientController)
	);

	fastify.post<{
		Body: { names: string[] };
		Reply: Ingredient[];
	}>(
		"/by-names",
		{ preHandler: [fastify.auth] },
		ingredientController.getIngredientsByNames.bind(ingredientController)
	);

	fastify.get<{
		Querystring: { limit?: number; offset?: number };
		Reply: Ingredient[];
	}>(
		"/",
		{ preHandler: [fastify.auth] },
		ingredientController.getAllIngredients.bind(ingredientController)
	);

	fastify.get<{
		Querystring: { q: string; limit?: number };
		Reply: Ingredient[];
	}>(
		"/search",
		{ preHandler: [fastify.auth] },
		ingredientController.searchIngredients.bind(ingredientController)
	);

	fastify.get<{
		Reply: { count: number };
	}>(
		"/count",
		{ preHandler: [fastify.auth] },
		ingredientController.getIngredientsCount.bind(ingredientController)
	);
}
