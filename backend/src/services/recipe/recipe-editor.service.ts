import { PrismaClient, Prisma } from "@prisma/client";
import { UpdateRecipeInput, FullRecipe } from "../../types/recipe.types";
import { IngredientService } from "../ingredient/ingredient.service";
import { ValidationError } from "../../errors/recipe.errors";
import { RecipeValidationService } from "../../validation/recipe/recipe.validation";

export class RecipeEditor {
	private ingredientService: IngredientService;
	private validationService: RecipeValidationService;

	constructor(private prisma: PrismaClient) {
		this.ingredientService = new IngredientService(prisma);
		this.validationService = new RecipeValidationService(prisma);
	}

	async updateRecipe(
		id: string,
		input: UpdateRecipeInput,
		userId: string
	): Promise<FullRecipe> {
		const validation =
			await this.validationService.validateUpdateRecipeInput(
				id,
				input,
				userId
			);
		if (!validation.isValid) {
			throw new ValidationError(validation.errors);
		}

		return await this.prisma.$transaction(async (tx) => {
			await this.updateMainRecipe(tx, id, input);

			if (input.ingredients) {
				await this.updateIngredients(tx, id, input.ingredients);
			}

			if (input.dietaryRestrictionIds) {
				await this.updateDietaryRestrictions(
					tx,
					id,
					input.dietaryRestrictionIds
				);
			}

			if (input.steps) {
				await this.updateStepsAndBullets(tx, id, input.steps);
			}

			return await this.getFullRecipe(tx, id);
		});
	}

	private async updateMainRecipe(
		tx: Prisma.TransactionClient,
		id: string,
		input: UpdateRecipeInput
	) {
		await tx.recipe.update({
			where: { id },
			data: {
				name: input.name?.trim(),
				isPrivate: input.isPrivate,
				categoryId: input.categoryId,
				photo: input.photo?.trim(),
				servingsNumber: input.servingsNumber,
				preparationTime: input.preparationTime,
				cuisineId: input.cuisineId,
				difficultyLevel: input.difficultyLevel,
			},
		});
	}

	private async updateIngredients(
		tx: Prisma.TransactionClient,
		recipeId: string,
		ingredients: UpdateRecipeInput["ingredients"]
	) {
		await tx.recipeIngredient.deleteMany({ where: { recipeId } });

		const resolved = await this.ingredientService.resolveIngredients(
			ingredients ?? [],
			tx
		);

		if (resolved.length > 0) {
			await tx.recipeIngredient.createMany({
				data: resolved.map((r) => ({
					recipeId,
					ingredientId: r.ingredient.id,
					number: r.amount,
					measureUnitId: r.measureUnitId,
				})),
			});
		}
	}

	private async updateDietaryRestrictions(
		tx: Prisma.TransactionClient,
		recipeId: string,
		restrictionIds: string[]
	) {
		await tx.recipeDietaryRestriction.deleteMany({ where: { recipeId } });

		if (restrictionIds.length > 0) {
			await tx.recipeDietaryRestriction.createMany({
				data: restrictionIds.map((id) => ({
					recipeId,
					restrictionId: id,
				})),
			});
		}
	}

	private async updateStepsAndBullets(
		tx: Prisma.TransactionClient,
		recipeId: string,
		steps: NonNullable<UpdateRecipeInput["steps"]>
	) {
		await tx.recipeStepBullet.deleteMany({
			where: { step: { recipeId } },
		});
		await tx.recipeStep.deleteMany({ where: { recipeId } });

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

		const bulletData = steps.flatMap((step) => {
			const created = createdSteps.find(
				(s) => s.stepNumber === step.stepNumber
			);
			if (!created) {
				throw new Error(`Missing step ${step.stepNumber}`);
			}
			return step.bullets.map((bullet) => ({
				stepId: created.id,
				content: bullet.trim(),
			}));
		});

		if (bulletData.length > 0) {
			await tx.recipeStepBullet.createMany({ data: bulletData });
		}
	}

	private async getFullRecipe(
		tx: Prisma.TransactionClient,
		id: string
	): Promise<FullRecipe> {
		const fullRecipe = await tx.recipe.findUnique({
			where: { id },
			include: {
				ingredients: {
					include: { ingredient: true, measureUnit: true },
				},
				recipeSteps: {
					include: { stepBullets: true },
					orderBy: { stepNumber: "asc" },
				},
				dietaryRestrictions: {
					include: { dietaryRestriction: true },
				},
				category: true,
				cuisine: true,
				owner: { select: { id: true } },
			},
		});

		if (!fullRecipe) {
			throw new Error("Failed to retrieve updated recipe");
		}

		return fullRecipe as FullRecipe;
	}
}
