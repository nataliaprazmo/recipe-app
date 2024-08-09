import { FastifyInstance } from "fastify";
import { createRatingController } from "../controllers/rating.controller";
import { Rating } from "@prisma/client";

export async function userRatingRoutes(fastify: FastifyInstance) {
	const ratingController = createRatingController(fastify.prisma);

	fastify.get<{
		Params: { recipeId: string };
		Reply: Rating | { error: string };
	}>(
		"/:recipeId",
		{ preHandler: [fastify.auth] },
		ratingController.getRatingByUserAndRecipe.bind(ratingController)
	);

	fastify.post<{ Body: { recipeId: string; score: number }; Reply: Rating }>(
		"/",
		{ preHandler: [fastify.auth] },
		ratingController.createRating.bind(ratingController)
	);

	fastify.put<{ Body: { recipeId: string; score: number }; Reply: Rating }>(
		"/",
		{ preHandler: [fastify.auth] },
		ratingController.updateRating.bind(ratingController)
	);
}

export async function recipeRatingRoutes(fastify: FastifyInstance) {
	const ratingController = createRatingController(fastify.prisma);

	fastify.get<{ Params: { recipeId: string }; Reply: number }>(
		"/:recipeId/average",
		ratingController.getAverageRatingForRecipe.bind(ratingController)
	);
}
