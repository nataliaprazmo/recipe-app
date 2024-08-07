import { FastifyInstance } from "fastify";
import {
	BasicRecipe,
	CreateRecipeInput,
	FullRecipe,
	UpdateRecipeInput,
} from "../types/recipe.types";
import { createRecipeController } from "../controllers/recipe.controller";
import { recipeCommentRoutes } from "./comment.route";
import { recipeRatingRoutes } from "./rating.route";

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

	// comments
	fastify.register(recipeCommentRoutes, { prefix: "/comments" });

	// ratings
	fastify.register(recipeRatingRoutes, { prefix: "/ratings" });
}

export async function userRecipeRoutes(fastify: FastifyInstance) {
	const recipeController = createRecipeController(fastify.prisma);

	fastify.get<{
		Params: { userId?: string };
		Querystring: { includePrivate?: boolean };
		Reply: BasicRecipe[];
	}>(
		"/",
		{ preHandler: [fastify.auth] },
		recipeController.getRecipesByUser.bind(recipeController)
	);

	fastify.get<{
		Params: { userId?: string };
		Querystring: { includePrivate?: boolean };
		Reply: BasicRecipe[];
	}>(
		"/:userId",
		{ preHandler: [fastify.auth] },
		recipeController.getRecipesByUser.bind(recipeController)
	);
}
