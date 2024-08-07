import { PrismaClient } from "@prisma/client";
import { RatingService } from "../services/rating/rating.service";
import { FastifyReply, FastifyRequest } from "fastify";

class RatingController {
	constructor(private ratingService: RatingService) {}

	async getRatingByUserAndRecipe(
		request: FastifyRequest<{ Params: { recipeId: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const recipeId = request.params.recipeId;
			const userId = request.user.id;
			const rating = await this.ratingService.getRatingByUserAndRecipe({
				recipeId,
				userId,
			});
			await reply
				.status(200)
				.send({ message: "Fetched user rating for recipe", rating });
		} catch (error) {
			request.log.error("Error fetching rating", error);
			await reply.status(400).send({ error: "Error fetching rating" });
		}
	}

	async createRating(
		request: FastifyRequest<{ Body: { recipeId: string; score: number } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const userId = request.user.id;

			const newRating = await this.ratingService.createRating({
				userId: userId,
				...request.body,
			});
			await reply
				.status(201)
				.send({ message: "Rating created successfully", newRating });
		} catch (error) {
			request.log.error("Error creating rating", error);
			await reply.status(400).send({ error: "Error creating rating" });
		}
	}

	async updateRating(
		request: FastifyRequest<{ Body: { recipeId: string; score: number } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const userId = request.user.id;
			const recipeId = request.body.recipeId;
			const score = request.body.score;

			const updatedRating = await this.ratingService.updateRating(
				{ recipeId, userId },
				score
			);
			await reply.status(200).send({
				message: "Rating updated successfully",
				updatedRating,
			});
		} catch (error) {
			request.log.error("Error updating rating", error);
			await reply.status(400).send({ error: "Error updating rating" });
		}
	}

	async getAverageRatingForRecipe(
		request: FastifyRequest<{ Params: { recipeId: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const recipeId = request.params.recipeId;
			const avgScore = await this.ratingService.getAverageRatingForRecipe(
				recipeId
			);
			await reply
				.status(200)
				.send({
					message: "Fetched average rating for recipe",
					avgScore,
				});
		} catch (error) {
			request.log.error("Error fetching average rating", error);
			await reply
				.status(400)
				.send({ error: "Error fetching average rating" });
		}
	}
}

export const createRatingController = (
	prisma: PrismaClient
): RatingController => {
	const ratingService = new RatingService(prisma);
	return new RatingController(ratingService);
};
