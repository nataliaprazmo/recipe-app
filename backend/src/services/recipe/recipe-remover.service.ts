import { PrismaClient } from "@prisma/client";

export class RecipeRemover {
	constructor(private prisma: PrismaClient) {}

	async deleteRecipe(id: string, userId: string): Promise<void> {
		const recipe = await this.prisma.recipe.findUnique({
			where: { id },
			select: { ownerId: true },
		});

		if (!recipe) {
			throw new Error("Recipe not found");
		}

		if (recipe.ownerId !== userId) {
			throw new Error("Unauthorized: You do not own this recipe");
		}

		await this.prisma.recipe.delete({ where: { id } });
	}
}
