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

		if (recipe.ownerId !== userId) {
			errors.push("You do not have permission to update this recipe");
		}

		this.validateBasicFieldsForUpdate(input, errors);

		if (input.ingredients) validateIngredients(input.ingredients, errors);
		if (input.steps) validateSteps(input.steps, errors);

		if (
			input.categoryId !== undefined ||
			input.cuisineId !== undefined ||
			(input.dietaryRestrictionIds &&
				input.dietaryRestrictionIds.length > 0)
		) {
			await validateForeignKeys(
				this.prisma,
				input as CreateRecipeInput,
				errors
			);
		}

		return { isValid: errors.length === 0, errors };
	}

	validateBasicFieldsForUpdate(
		input: UpdateRecipeInput,
		errors: string[]
	): void {
		if (input.name !== undefined) {
			if (!input.name?.trim()) {
				errors.push("Recipe name is required");
			} else if (input.name.trim().length > 100) {
				errors.push("Recipe name is too long");
			}
		}

		if (input.photo !== undefined) {
			if (input.photo && input.photo.trim().length === 0) {
				errors.push("Photo URL cannot be empty if provided");
			}
			if (input.photo && input.photo.length > 500) {
				errors.push("Photo URL is too long");
			}
		}

		if (input.servingsNumber !== undefined) {
			if (
				!Number.isInteger(input.servingsNumber) ||
				input.servingsNumber <= 0
			) {
				errors.push("Servings must be a positive integer");
			}
		}

		if (input.difficultyLevel !== undefined) {
			const validLevels = ["EASY", "MEDIUM", "HARD"];
			if (!validLevels.includes(input.difficultyLevel)) {
				errors.push("Invalid difficulty level");
			}
		}

		if (input.preparationTime !== undefined) {
			if (
				input.preparationTime !== null &&
				(!Number.isInteger(input.preparationTime) ||
					input.preparationTime <= 0)
			) {
				errors.push(
					"Preparation time must be a positive integer or null"
				);
			}
		}
	}
}
