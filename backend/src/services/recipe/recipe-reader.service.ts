import { PrismaClient } from "@prisma/client";
import { FullRecipe } from "../../types/recipe.types";

export class RecipeReader {
	constructor(private prisma: PrismaClient) {}

	async getRecipeById(id: string, userId?: string): Promise<FullRecipe | null> {
		const recipe = await this.prisma.recipe.findFirst({
			where: {
				id,
				OR: [{ isPrivate: false }, { ownerId: userId }],
			},
			include: this.getRecipeIncludeOptions(),
		});

		return recipe as FullRecipe | null;
	}

	async getRecipesByUser(userId: string, includePrivate: boolean = true): Promise<FullRecipe[]> {
		const recipes = await this.prisma.recipe.findMany({
			where: {
				ownerId: userId,
				...(includePrivate ? {} : { isPrivate: false }),
			},
			include: this.getRecipeIncludeOptions(),
			orderBy: { createdAt: 'desc' },
		});

		return recipes as FullRecipe[];
	}

	async getPublicRecipes(limit?: number, offset?: number): Promise<FullRecipe[]> {
		const recipes = await this.prisma.recipe.findMany({
			where: { isPrivate: false },
			include: this.getRecipeIncludeOptions(),
			orderBy: { createdAt: 'desc' },
			...(limit && { take: limit }),
			...(offset && { skip: offset }),
		});

		return recipes as FullRecipe[];
	}

	private getRecipeIncludeOptions() {
		return {
			ingredients: {
				include: {
					ingredient: true,
					measureUnit: true,
				},
			},
			recipeSteps: {
				include: {
					stepBullets: true,
				},
				orderBy: {
					stepNumber: "asc" as const,
				},
			},
			dietaryRestrictions: {
				include: {
					dietaryRestriction: true,
				},
			},
			category: true,
			cuisine: true,
			owner: {
				select: {
					id: true,
				},
			},
		};
	}
}