import { DifficultyLevel, Prisma, PrismaClient } from "@prisma/client";
import { BasicRecipe, RecipeFilterInput } from "../../types/recipe.types";

type RecipeFindManyArgs = Prisma.RecipeFindManyArgs;
type RecipeWhereInput = Prisma.RecipeWhereInput;
type RecipeOrderByWithRelationInput = Prisma.RecipeOrderByWithRelationInput;

export class RecipeFiltering {
	private readonly defaultIncludes = {
		category: true,
		ratings: true,
	} as const;

	constructor(private prisma: PrismaClient) {}

	async getFilteredAndSortedRecipes(
		filters: RecipeFilterInput
	): Promise<BasicRecipe[]> {
		const query = this.buildQuery(filters);
		const recipes = await this.prisma.recipe.findMany(query);
		return recipes.map((recipe) => ({
			id: recipe.id,
			name: recipe.name,
			photo: recipe.photo,
			preparationTime: recipe.preparationTime,
			servingsNumber: recipe.servingsNumber,
			difficultyLevel: recipe.difficultyLevel,
			category: recipe.category,
			ratings: recipe.ratings,
			averageRating: recipe.averageRating,
		}));
	}

	private buildQuery(filters: RecipeFilterInput): RecipeFindManyArgs & {
		include: {
			category: true;
			ratings: true;
		};
	} {
		const {
			sortBy = "createdAt",
			sortOrder = "asc",
			searchTerm,
			limit,
		} = filters;

		const whereClause = this.buildWhereClause(filters);

		if (limit !== undefined && parseInt(limit)) {
			return {
				where: whereClause,
				include: this.defaultIncludes,
				orderBy: this.getOrderBy(sortBy, sortOrder, searchTerm),
				take: parseInt(limit),
			};
		}

		return {
			where: whereClause,
			include: this.defaultIncludes,
			orderBy: this.getOrderBy(sortBy, sortOrder, searchTerm),
		};
	}

	private buildWhereClause(filters: RecipeFilterInput): RecipeWhereInput {
		const { searchTerm } = filters;
		const conditions: RecipeWhereInput = {};

		conditions.OR = [{ isPrivate: false }];

		const andConditions: RecipeWhereInput[] = [];

		if (searchTerm) {
			andConditions.push({
				OR: [
					{
						name: {
							search: this.formatSearchTerm(searchTerm),
						},
					},
					{
						recipeSteps: {
							some: {
								OR: [
									{
										name: {
											contains: searchTerm,
										},
									},
									{
										stepBullets: {
											some: {
												content: {
													contains: searchTerm,
												},
											},
										},
									},
								],
							},
						},
					},
				],
			});
		}

		const filterConditions = this.buildFilterConditions(filters);
		if (filterConditions) {
			andConditions.push(filterConditions);
		}

		if (andConditions.length > 0) {
			conditions.AND = andConditions;
		}

		return conditions;
	}

	private formatSearchTerm(term: string): string {
		return term
			.toLowerCase()
			.split(/\s+/)
			.filter((word) => word.length > 0)
			.map((word) => `+${word}*`)
			.join(" ");
	}

	private buildFilterConditions(
		filters: RecipeFilterInput
	): RecipeWhereInput | null {
		const filterConditions: RecipeWhereInput = {};

		this.addIngredientFilter(filterConditions, filters.ingredientNames);
		this.addPreparationTimeFilter(
			filterConditions,
			filters.maxPreparationTime
		);
		this.addServingNumberFilter(
			filterConditions,
			filters.minServingNumber,
			filters.maxServingNumber
		);
		this.addDifficultyFilter(filterConditions, filters.difficultyLevel);
		this.addCuisineFilter(filterConditions, filters.cuisineIds);
		this.addCategoryFilter(filterConditions, filters.categoryIds);
		this.addDietaryRestrictionFilter(
			filterConditions,
			filters.dietaryRestrictionIds
		);

		return Object.keys(filterConditions).length > 0
			? filterConditions
			: null;
	}

	private getOrderBy(
		sortBy: string,
		sortOrder: "asc" | "desc",
		searchTerm?: string
	): RecipeOrderByWithRelationInput {
		if (searchTerm && sortBy === "relevance") {
			return {
				_relevance: {
					fields: ["name"],
					search: searchTerm,
					sort: "desc",
				},
			};
		}

		return { [sortBy]: sortOrder };
	}

	private addIngredientFilter(
		conditions: RecipeWhereInput,
		ingredientNames?: string[]
	): void {
		if (!this.isNonEmptyArray(ingredientNames)) return;

		conditions.ingredients = {
			some: {
				ingredient: {
					name: { in: ingredientNames },
				},
			},
		};
	}

	private addPreparationTimeFilter(
		conditions: RecipeWhereInput,
		maxPreparationTime?: string
	): void {
		if (maxPreparationTime === undefined || !parseInt(maxPreparationTime))
			return;

		conditions.preparationTime = { lte: parseInt(maxPreparationTime) };
	}

	private addServingNumberFilter(
		conditions: RecipeWhereInput,
		minServingNumber?: string,
		maxServingNumber?: string
	): void {
		if (minServingNumber === undefined && maxServingNumber === undefined)
			return;

		const servingsCondition: Prisma.IntFilter = {};

		if (minServingNumber !== undefined && parseInt(minServingNumber)) {
			servingsCondition.gte = parseInt(minServingNumber);
		}

		if (maxServingNumber !== undefined && parseInt(maxServingNumber)) {
			servingsCondition.lte = parseInt(maxServingNumber);
		}

		conditions.servingsNumber = servingsCondition;
	}

	private addDifficultyFilter(
		conditions: RecipeWhereInput,
		difficultyLevel?: string
	): void {
		if (
			difficultyLevel === undefined ||
			!(difficultyLevel in DifficultyLevel)
		)
			return;

		conditions.difficultyLevel =
			DifficultyLevel[difficultyLevel as keyof typeof DifficultyLevel];
	}

	private addCuisineFilter(
		conditions: RecipeWhereInput,
		cuisineIds?: string[] | string
	): void {
		if (!cuisineIds) return;

		const idsArray = Array.isArray(cuisineIds) ? cuisineIds : [cuisineIds];

		if (idsArray.length === 0) return;

		conditions.categoryId = { in: idsArray };
	}

	private addCategoryFilter(
		conditions: RecipeWhereInput,
		categoryIds?: string[] | string
	): void {
		if (!categoryIds) return;

		const idsArray = Array.isArray(categoryIds)
			? categoryIds
			: [categoryIds];

		if (idsArray.length === 0) return;

		conditions.categoryId = { in: idsArray };
	}

	private addDietaryRestrictionFilter(
		conditions: RecipeWhereInput,
		dietaryRestrictionIds?: string[] | string
	): void {
		if (!dietaryRestrictionIds) return;

		const idsArray = Array.isArray(dietaryRestrictionIds)
			? dietaryRestrictionIds
			: [dietaryRestrictionIds];

		if (idsArray.length === 0) return;

		conditions.dietaryRestrictions = {
			some: {
				restrictionId: { in: idsArray },
			},
		};
	}

	private isNonEmptyArray<T>(array?: T[]): array is T[] {
		return Array.isArray(array) && array.length > 0;
	}
}
