type IdNamePair = {
	id: string;
	name: string;
};

export type Category = IdNamePair;

export type Cuisine = IdNamePair;

export type DietaryRestriction = IdNamePair;

export type DifficultyLevel = {
	EASY: "EASY";
	MEDIUM: "MEDIUM";
	HARD: "HARD";
};

export type MeasureUnit = IdNamePair;

export type Ingredient = IdNamePair;

type RecipeIngredient = {
	id: string;
	recipeId: string;
	ingredientId: string;
	number: number;
	measureUnitId: string;
	ingredient: Ingredient;
	measureUnit: MeasureUnit;
};

export type Rating = {
	id: string;
	recipeId: string;
	userId: string;
	score: number;
};

type StepBullet = {
	id: string;
	content: string;
	stepId: string;
};

type RecipeStep = IdNamePair & {
	stepNumber: number;
	recipeId: string;
	stepBullets: StepBullet[];
};

export type BasicRecipe = IdNamePair & {
	photo: string;
	preparationTime: number;
	servingsNumber: number;
	category: Category;
	ratings: Rating[];
	averageRating: number | null;
};

export type Recipe = BasicRecipe & {
	ownerId: string;
	isPrivate: boolean;
	categoryId: string;
	cuisineId: string;
	difficultyLevel: string;
	createdAt: Date;
	updatedAt: Date;
	ingredients: RecipeIngredient[];
	recipeSteps: RecipeStep[];
	dietaryRestrictions: DietaryRestriction[];
	cuisine: Cuisine;
	owner: { id: string };
};

export type RecipeFilter = {
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

export type User = IdNamePair & {
	email: string;
	password: string;
	backgroundPicture: string | null;
	profilePicture: string | null;
};

export type Comment = {
	id: string;
	content: string;
	ownerId: string;
	recipeId: string;
};
