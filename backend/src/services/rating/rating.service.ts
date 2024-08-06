import { PrismaClient, Rating } from "@prisma/client";
import { CreateRatingInput, RatingBase } from "../../types/rating.types";

export class RatingService {
	constructor(private prisma: PrismaClient) {}

	async getRatingByUserAndRecipe(data: RatingBase): Promise<Rating | null> {
		return this.prisma.rating.findFirst({
			where: {
				AND: [{ userId: data.userId }, { recipeId: data.recipeId }],
			},
		});
	}

	async createRating(data: CreateRatingInput): Promise<Rating> {
		return this.prisma.rating.create({
			data,
		});
	}

	async updateRating(id: string, score: number): Promise<Rating> {
		return this.prisma.rating.update({
			where: {
				id: id,
			},
			data: {
				score: score,
			},
		});
	}

	async getAverageRatingForRecipe(recipeId: string): Promise<number | null> {
		const result = await this.prisma.rating.aggregate({
			_avg: {
				score: true,
			},
			where: { recipeId },
		});
		return result._avg.score;
	}
}
