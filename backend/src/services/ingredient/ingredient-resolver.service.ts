import { Ingredient, Prisma } from "@prisma/client";
import {
	CreateIngredientInput,
	ResolvedIngredient,
} from "../../types/ingredient.types";
import { IngredientNormalizer } from "./ingredient-normalizer.service";

type PrismaTransactionClient = Prisma.TransactionClient;

export class IngredientResolver {
	private normalizer: IngredientNormalizer;

	constructor() {
		this.normalizer = new IngredientNormalizer();
	}

	async resolveIngredients(
		ingredientInputs: CreateIngredientInput[],
		tx: PrismaTransactionClient
	): Promise<ResolvedIngredient[]> {
		// Step 1: Extract and validate unique ingredient names
		const uniqueNames = this.extractUniqueNames(ingredientInputs);

		if (uniqueNames.length === 0) {
			throw new Error("No valid ingredient names provided");
		}

		// Step 2: Find existing ingredients
		const existingIngredients = await this.findExistingIngredients(
			tx,
			uniqueNames
		);

		// Step 3: Create missing ingredients
		const newIngredients = await this.createMissingIngredients(
			tx,
			uniqueNames,
			existingIngredients
		);

		// Step 4: Map inputs to resolved ingredients
		return this.mapInputsToResolvedIngredients(ingredientInputs, [
			...existingIngredients,
			...newIngredients,
		]);
	}

	private extractUniqueNames(
		ingredientInputs: CreateIngredientInput[]
	): string[] {
		return [
			...new Set(
				ingredientInputs.map((i) => i.name.trim().toLowerCase())
			),
		].filter((name) => name.length > 0);
	}

	private async findExistingIngredients(
		tx: PrismaTransactionClient,
		uniqueNames: string[]
	): Promise<Ingredient[]> {
		return await tx.ingredient.findMany({
			where: {
				name: {
					in: uniqueNames.map((name) =>
						this.normalizer.normalizeIngredientName(name)
					),
				},
			},
		});
	}

	private async createMissingIngredients(
		tx: PrismaTransactionClient,
		uniqueNames: string[],
		existingIngredients: Ingredient[]
	): Promise<Ingredient[]> {
		const existingIngredientsMap = new Map(
			existingIngredients.map((ing) => [ing.name.toLowerCase(), ing])
		);

		const ingredientsToCreate = uniqueNames
			.filter((name) => !existingIngredientsMap.has(name))
			.map((name) => ({
				name: this.normalizer.normalizeIngredientName(name),
			}));

		if (ingredientsToCreate.length === 0) {
			return [];
		}

		await tx.ingredient.createMany({
			data: ingredientsToCreate,
			skipDuplicates: true,
		});

		const newIngredients = await tx.ingredient.findMany({
			where: {
				name: {
					in: ingredientsToCreate.map((ing) => ing.name),
				},
			},
		});

		return newIngredients;
	}

	private mapInputsToResolvedIngredients(
		ingredientInputs: CreateIngredientInput[],
		allIngredients: Ingredient[]
	): ResolvedIngredient[] {
		const allIngredientsMap = new Map(
			allIngredients.map((ing) => [ing.name.toLowerCase(), ing])
		);

		return ingredientInputs.map((input) => {
			const normalizedName = input.name.trim().toLowerCase();
			const ingredient = allIngredientsMap.get(normalizedName);

			if (!ingredient) {
				throw new Error(`Failed to resolve ingredient: ${input.name}`);
			}

			return {
				ingredient,
				amount: input.amount,
				measureUnitId: input.measureUnitId,
			};
		});
	}
}
