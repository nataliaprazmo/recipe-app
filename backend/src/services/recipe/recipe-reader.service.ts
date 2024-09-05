import { DifficultyLevel, PrismaClient, Recipe } from "@prisma/client";
import { BasicRecipe, FullRecipe } from "../../types/recipe.types";
import crypto from "crypto";

export class RecipeReader {
	constructor(private prisma: PrismaClient) {}

	async getRecipeById(
		id: string,
		userId?: string
	): Promise<FullRecipe | null> {
		const recipe = await this.prisma.recipe.findFirst({
			where: {
				id,
				OR: [{ isPrivate: false }, { ownerId: userId }],
			},
			include: this.getRecipeIncludeOptions(),
		});

		return recipe as FullRecipe | null;
	}

	async getRecipesByUser(
		userId: string,
		includePrivate: boolean = true
	): Promise<BasicRecipe[]> {
		const recipes = await this.prisma.recipe.findMany({
			where: {
				ownerId: userId,
				...(includePrivate ? {} : { isPrivate: false }),
			},
			orderBy: { createdAt: "desc" },
			select: this.getBasicRecipeSelectOptions(),
		});

		return recipes as BasicRecipe[];
	}

	async getRecipeOfTheDay(): Promise<Recipe | null> {
		const totalCount = await this.prisma.recipe.count({
			where: { isPrivate: false },
		});

		if (totalCount === 0) return null;

		const today = new Date().toISOString().split("T")[0];
		const hash = crypto.createHash("sha256").update(today).digest("hex");

		const hashInt = parseInt(hash.slice(0, 8), 16);
		const index = hashInt % totalCount;

		const [recipe] = await this.prisma.recipe.findMany({
			where: { isPrivate: false },
			skip: index,
			take: 1,
			include: this.getRecipeIncludeOptions(),
		});

		return recipe ?? null;
	}

	async getPublicRecipes(
		limit?: number,
		offset?: number
	): Promise<BasicRecipe[]> {
		const recipes = await this.prisma.recipe.findMany({
			where: { isPrivate: false },
			orderBy: { createdAt: "desc" },
			...(limit && { take: limit }),
			...(offset && { skip: offset }),
			select: this.getBasicRecipeSelectOptions(),
		});

		return recipes as BasicRecipe[];
	}

	private getBasicRecipeSelectOptions() {
		return {
			id: true,
			name: true,
			photo: true,
			preparationTime: true,
			servingsNumber: true,
			category: true,
			ratings: true,
			difficultyLevel: true,
			averageRating: true,
		};
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
