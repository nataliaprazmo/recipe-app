import { PrismaClient, Prisma } from "@prisma/client";
import { CreateRecipeInput, FullRecipe } from "../../types/recipe.types";
import { IngredientService } from "../ingredient/ingredient.service";
import { ValidationError } from "../../errors/recipe.errors";
import { CreateStepInput } from "../../types/recipe-step.types";
import { CreateIngredientInput } from "../../types/ingredient.types";
import { RecipeValidationService } from "../../validation/recipe/recipe.validation";

export class RecipeCreator {
	private ingredientService: IngredientService;
	private validationService: RecipeValidationService;

	constructor(private prisma: PrismaClient) {
		this.ingredientService = new IngredientService(prisma);
		this.validationService = new RecipeValidationService(prisma);
	}

	async createRecipe(
		input: CreateRecipeInput,
		ownerId: string
	): Promise<FullRecipe> {
		const validation =
			await this.validationService.validateCreateRecipeInput(
				input,
				ownerId
			);
		if (!validation.isValid) {
			throw new ValidationError(validation.errors);
		}

		return await this.prisma.$transaction(
			async (tx: Prisma.TransactionClient) => {
				// Step 1: Create the main recipe record
				const recipe = await this.createMainRecipe(tx, input, ownerId);

				// Step 2: Handle ingredients
				await this.handleRecipeIngredients(
					tx,
					recipe.id,
					input.ingredients
				);

				// Step 3: Handle dietary restrictions
				await this.handleDietaryRestrictions(
					tx,
					recipe.id,
					input.dietaryRestrictionIds
				);

				// Step 4: Handle recipe steps and bullets
				await this.handleRecipeSteps(tx, recipe.id, input.steps);

				// Step 5: Return complete recipe
				return await this.getFullRecipe(tx, recipe.id);
			}
		);
	}

	private async createMainRecipe(
		tx: Prisma.TransactionClient,
		input: CreateRecipeInput,
		ownerId: string
	) {
		return await tx.recipe.create({
			data: {
				ownerId,
				name: input.name.trim(),
				isPrivate: input.isPrivate,
				categoryId: input.categoryId,
				photo: input.photo.trim(),
				servingsNumber: input.servingsNumber,
				preparationTime: input.preparationTime,
				cuisineId: input.cuisineId,
				difficultyLevel: input.difficultyLevel,
			},
		});
	}

	private async handleRecipeIngredients(
		tx: Prisma.TransactionClient,
		recipeId: string,
		ingredients: CreateIngredientInput[]
	) {
		const resolvedIngredients =
			await this.ingredientService.resolveIngredients(ingredients, tx);

		if (resolvedIngredients.length > 0) {
			await tx.recipeIngredient.createMany({
				data: resolvedIngredients.map((resolved) => ({
					recipeId,
					ingredientId: resolved.ingredient.id,
					number: resolved.amount,
					measureUnitId: resolved.measureUnitId,
				})),
			});
		}
	}

	private async handleDietaryRestrictions(
		tx: Prisma.TransactionClient,
		recipeId: string,
		restrictionIds: string[]
	) {
		if (restrictionIds.length > 0) {
			await tx.recipeDietaryRestriction.createMany({
				data: restrictionIds.map((restrictionId) => ({
					recipeId,
					restrictionId,
				})),
			});
		}
	}

	private async handleRecipeSteps(
		tx: Prisma.TransactionClient,
		recipeId: string,
		steps: CreateStepInput[]
	) {
		await tx.recipeStep.createMany({
			data: steps.map((step) => ({
				recipeId,
				name: step.name.trim(),
				stepNumber: step.stepNumber,
			})),
		});

		const createdSteps = await tx.recipeStep.findMany({
			where: { recipeId },
			select: { id: true, stepNumber: true },
		});

		const stepBulletData = steps.flatMap((stepInput) => {
			const correspondingStep = createdSteps.find(
				(s: { id: string; stepNumber: number }) =>
					s.stepNumber === stepInput.stepNumber
			);
			if (!correspondingStep) {
				throw new Error(
					`Failed to find created step for step number ${stepInput.stepNumber}`
				);
			}

			return stepInput.bullets.map((bullet: string) => ({
				stepId: correspondingStep.id,
				content: bullet.trim(),
			}));
		});

		if (stepBulletData.length > 0) {
			await tx.recipeStepBullet.createMany({
				data: stepBulletData,
			});
		}
	}

	private async getFullRecipe(
		tx: Prisma.TransactionClient,
		recipeId: string
	): Promise<FullRecipe> {
		const fullRecipe = await tx.recipe.findUnique({
			where: { id: recipeId },
			include: {
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
						stepNumber: "asc",
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
			},
		});

		if (!fullRecipe) {
			throw new Error("Failed to retrieve created recipe");
		}

		return fullRecipe as FullRecipe;
	}
}
