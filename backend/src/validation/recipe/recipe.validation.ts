import { CreateRecipeInput, UpdateRecipeInput } from "../../types/recipe.types";
import { PrismaClient } from "@prisma/client";
import { ValidationResult } from "../../types/validation.types";
import { validateIngredients } from "../ingredient/ingredient.validation";
import { validateOwner } from "./recipe-owner.validation";
import { validateSteps } from "./recipe-step.validation";
import { validateForeignKeys } from "./recipe-foreign-keys.validation";
import { validateBasicFields } from "./recipe-fields.validation";

export class RecipeValidationService {
	constructor(private prisma: PrismaClient) {}

	async validateCreateRecipeInput(
		input: CreateRecipeInput,
		ownerId: string
	): Promise<ValidationResult> {
		const errors: string[] = [];

		validateBasicFields(input, errors);
		await validateForeignKeys(this.prisma, input, errors);
		validateIngredients(input.ingredients, errors);
		validateSteps(input.steps, errors);
		await validateOwner(this.prisma, ownerId, errors);

		return { isValid: errors.length === 0, errors };
	}

	async validateUpdateRecipeInput(
		id: string,
		input: UpdateRecipeInput,
		userId: string
	): Promise<ValidationResult> {
		const errors: string[] = [];

		const recipe = await this.prisma.recipe.findUnique({
			where: { id },
			select: { ownerId: true },
		});
		if (!recipe) return { isValid: false, errors: ["Recipe not found"] };
		if (recipe.ownerId !== userId)
			errors.push("You do not have permission to update this recipe");

		if (
			input.name !== undefined ||
			input.photo !== undefined ||
			input.servingsNumber !== undefined ||
			input.difficultyLevel !== undefined ||
			input.preparationTime !== undefined
		) {
			validateBasicFields(input as CreateRecipeInput, errors);
		}

		if (input.ingredients) validateIngredients(input.ingredients, errors);
		if (input.steps) validateSteps(input.steps, errors);

		if (
			input.categoryId ||
			input.cuisineId ||
			(input.dietaryRestrictionIds?.length ?? 0) > 0
		) {
			await validateForeignKeys(
				this.prisma,
				input as CreateRecipeInput,
				errors
			);
		}

		return { isValid: errors.length === 0, errors };
	}
}
