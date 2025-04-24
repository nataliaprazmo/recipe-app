import { PrismaClient, Rating } from "@prisma/client";
import { CreateRatingInput, RatingBase } from "../../types/rating.types";
import { AverageRatingService } from "./average-rating.service";

export class RatingService {
	constructor(private prisma: PrismaClient) {}

	private avgRatingService: AverageRatingService = new AverageRatingService(
		this.prisma
	);

	async getRatingByUserAndRecipe(data: RatingBase): Promise<Rating | null> {
		return this.prisma.rating.findFirst({
			where: {
				AND: [{ userId: data.userId }, { recipeId: data.recipeId }],
			},
		});
	}

	async createRating(data: CreateRatingInput): Promise<Rating> {
		return this.prisma.$transaction(async (tx) => {
			const newRating = await tx.rating.create({
				data,
			});

			await this.avgRatingService.updateAverageRating(tx, data.recipeId);

			return newRating;
		});
	}

	async updateRating(data: RatingBase, score: number): Promise<Rating> {
		const existingRating = await this.prisma.rating.findFirst({
			where: {
				AND: [{ userId: data.userId }, { recipeId: data.recipeId }],
			},
		});
		if (!existingRating) {
			throw Error("Rating with given id doesn't exist");
		}

		return this.prisma.$transaction(async (tx) => {
			const updatedRating = await tx.rating.update({
				where: { id: existingRating.id },
				data: {
					score: score,
				},
			});

			await this.avgRatingService.updateAverageRating(tx, data.recipeId);

			return updatedRating;
		});
	}

	async deleteRating(data: RatingBase): Promise<void> {
		const existingRating = await this.prisma.rating.findFirst({
			where: {
				AND: [{ userId: data.userId }, { recipeId: data.recipeId }],
			},
		});
		if (!existingRating) {
			throw Error("Rating with given id doesn't exist");
		}

		return this.prisma.$transaction(async (tx) => {
			await tx.rating.delete({
				where: { id: existingRating.id },
			});

			await this.avgRatingService.updateAverageRating(tx, data.recipeId);
		});
	}

	async getAverageRatingForRecipe(recipeId: string): Promise<number | null> {
		return this.avgRatingService.getRecipeAverageRating(recipeId);
	}
}
