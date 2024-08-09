import {
	Category,
	DifficultyLevel,
	Ingredient,
	Rating,
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

export type BasicRecipe = Pick<
	Recipe,
	"id" | "name" | "photo" | "preparationTime" | "servingsNumber"
> & {
	category: Category | null;
	ratings: Rating[];
};

export type RecipeFilterInput = {
	searchTerm?: string;
	ingredientNames?: string[];
	maxPreparationTime?: number;
	minServingNumber?: number;
	maxServingNumber?: number;
	difficultyLevel?: DifficultyLevel;
	cuisineId?: string;
	categoryIds?: string[] | string;
	dietaryRestrictionIds?: string[] | string;
	sortBy?: "createdAt" | "averageRating" | "preparationTime" | "relevance";
	sortOrder?: "asc" | "desc";
};
