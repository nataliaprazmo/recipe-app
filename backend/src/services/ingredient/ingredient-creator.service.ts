import { Ingredient, PrismaClient } from "@prisma/client";
import { CreateIngredientInput } from "../../types/ingredient.types";
import { IngredientNormalizer } from "./ingredient-normalizer.service";

type PrismaTransactionClient = Parameters<
	Parameters<PrismaClient["$transaction"]>[0]
>[0];

export class IngredientCreator {
	private normalizer: IngredientNormalizer;

	constructor(private prisma: PrismaClient) {
		this.normalizer = new IngredientNormalizer();
	}

	async createIngredient(input: CreateIngredientInput): Promise<Ingredient> {
		const normalizedName = this.normalizer.normalizeIngredientName(
			input.name
		);

		if (!this.normalizer.validateIngredientName(input.name)) {
			throw new Error(`Invalid ingredient name: ${input.name}`);
		}

		const existing = await this.prisma.ingredient.findFirst({
			where: { name: normalizedName },
		});

		if (existing) {
			return existing;
		}

		return await this.prisma.ingredient.create({
			data: {
				name: normalizedName,
			},
		});
	}

	async createManyIngredients(
		inputs: CreateIngredientInput[]
	): Promise<Ingredient[]> {
		return await this.prisma.$transaction(async (tx) => {
			const results: Ingredient[] = [];

			for (const input of inputs) {
				const normalizedName = this.normalizer.normalizeIngredientName(
					input.name
				);

				if (!this.normalizer.validateIngredientName(input.name)) {
					throw new Error(`Invalid ingredient name: ${input.name}`);
				}

				let ingredient = await tx.ingredient.findFirst({
					where: { name: normalizedName },
				});

				if (!ingredient) {
					ingredient = await tx.ingredient.create({
						data: {
							name: normalizedName,
						},
					});
				}

				results.push(ingredient);
			}

			return results;
		});
	}

	async bulkCreateIngredients(
		ingredientNames: string[],
		tx?: PrismaTransactionClient
	): Promise<Ingredient[]> {
		const client = tx || this.prisma;

		const normalizedNames = ingredientNames.map((name) =>
			this.normalizer.normalizeIngredientName(name)
		);

		await client.ingredient.createMany({
			data: normalizedNames.map((name) => ({ name })),
			skipDuplicates: true,
		});

		return await client.ingredient.findMany({
			where: {
				name: { in: normalizedNames },
			},
		});
	}
}
