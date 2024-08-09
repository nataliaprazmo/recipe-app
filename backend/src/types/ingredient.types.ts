import { Ingredient } from "@prisma/client";

export type CreateIngredientInput = {
	name: string;
	amount?: number;
	measureUnitId?: string;
};

export type ResolvedIngredient = {
	ingredient: Ingredient;
	amount?: number;
	measureUnitId?: string;
};
