import { PrismaClient } from "@prisma/client";

export class AverageRatingService {
	constructor(private prisma: PrismaClient) {}

	async updateAverageRating(tx: any, recipeId: string): Promise<void> {
		const result = await tx.rating.aggregate({
			where: { recipeId },
			_avg: { score: true },
		});

		await tx.recipe.update({
			where: { id: recipeId },
			data: { averageRating: result._avg.score },
		});
	}

	async recalculateAverageRating(recipeId: string): Promise<void> {
		return this.prisma.$transaction(async (tx) => {
			await this.updateAverageRating(tx, recipeId);
		});
	}

	async recalculateAllAverageRatings(): Promise<void> {
		const recipes = await this.prisma.recipe.findMany({
			select: { id: true },
		});

		for (const recipe of recipes) {
			await this.recalculateAverageRating(recipe.id);
		}
	}

	async getRecipeAverageRating(id: string): Promise<number | null> {
		const recipe = await this.prisma.recipe.findUnique({
			where: {
				id,
			},
			select: {
				averageRating: true,
			},
		});

		return recipe?.averageRating ?? null;
	}
}
