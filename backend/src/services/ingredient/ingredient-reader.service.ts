import { Ingredient, PrismaClient } from "@prisma/client";
import { IngredientNormalizer } from "./ingredient-normalizer.service";

export class IngredientReader {
	private normalizer: IngredientNormalizer;

	constructor(private prisma: PrismaClient) {
		this.normalizer = new IngredientNormalizer();
	}

	async getIngredientById(id: string): Promise<Ingredient | null> {
		return await this.prisma.ingredient.findUnique({
			where: { id },
		});
	}

	async getIngredientByName(name: string): Promise<Ingredient | null> {
		const normalizedName = this.normalizer.normalizeIngredientName(name);
		return await this.prisma.ingredient.findFirst({
			where: { name: normalizedName },
		});
	}

	async getIngredientsByNames(names: string[]): Promise<Ingredient[]> {
		const normalizedNames = names.map((name) =>
			this.normalizer.normalizeIngredientName(name)
		);

		return await this.prisma.ingredient.findMany({
			where: {
				name: { in: normalizedNames },
			},
		});
	}

	async getAllIngredients(
		limit?: number,
		offset?: number
	): Promise<Ingredient[]> {
		return await this.prisma.ingredient.findMany({
			orderBy: { name: "asc" },
			...(limit && { take: limit }),
			...(offset && { skip: offset }),
		});
	}

	async searchIngredients(
		searchTerm: string,
		limit: number = 10
	): Promise<Ingredient[]> {
		const normalizedSearch =
			this.normalizer.normalizeIngredientName(searchTerm);

		return await this.prisma.ingredient.findMany({
			where: {
				name: {
					contains: normalizedSearch,
				},
			},
			take: limit,
			orderBy: { name: "asc" },
		});
	}

	async getIngredientsCount(): Promise<number> {
		return await this.prisma.ingredient.count();
	}
}
