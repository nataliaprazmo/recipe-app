import {
	Ingredient,
	Recipe,
	RecipeIngredient,
	RecipeStep,
	RecipeStepBullet,
} from "@prisma/client";
import { CreateIngredientInput } from "./ingredient.types";
import { CreateStepInput } from "./recipe-step.types";

export type CreateRecipeInput = Omit<
	Recipe,
	"id" | "createdAt" | "updatedAt" | "ownerId"
> & {
	dietaryRestrictionIds: string[];
	ingredients: CreateIngredientInput[];
	steps: CreateStepInput[];
};

export type UpdateRecipeInput = Partial<
	Omit<Recipe, "id" | "createdAt" | "updatedAt" | "ownerId">
> & {
	dietaryRestrictionIds?: string[];
	ingredients?: CreateIngredientInput[];
	steps?: CreateStepInput[];
};

export type FullRecipe = Recipe & {
	ingredients: (RecipeIngredient & { ingredient: Ingredient })[];
	recipeSteps: (RecipeStep & { stepBullets: RecipeStepBullet[] })[];
	dietaryRestrictions: any[];
};
