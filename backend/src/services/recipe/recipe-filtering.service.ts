import { DifficultyLevel, Prisma, PrismaClient } from "@prisma/client";
import { RecipeFilterInput } from "../../types/recipe.types";

type RecipeFindManyArgs = Prisma.RecipeFindManyArgs;
type RecipeWhereInput = Prisma.RecipeWhereInput;

export class RecipeFiltering {
	private readonly defaultIncludes = {
		recipeSteps: {
			include: {
				stepBullets: true,
			},
		},
		category: true,
		ratings: true,
	} as const;

	constructor(private prisma: PrismaClient) {}

	async getFilteredAndSortedRecipes(
		filters: RecipeFilterInput,
		searcherId?: string
	) {
		const query = this.buildQuery(filters, searcherId);
		return this.prisma.recipe.findMany(query);
	}

	private buildQuery(
		filters: RecipeFilterInput,
		searcherId?: string
	): RecipeFindManyArgs {
		const { sortBy = "createdAt", sortOrder = "asc", searchTerm } = filters;

		const whereClause = this.buildWhereClause(filters, searcherId);

		return {
			where: whereClause,
			include: this.defaultIncludes,
			orderBy: this.getOrderBy(sortBy, sortOrder, searchTerm),
		};
	}

	private buildWhereClause(
		filters: RecipeFilterInput,
		searcherId?: string
	): RecipeWhereInput {
		const { searchTerm } = filters;
		const conditions: RecipeWhereInput = {};

		conditions.OR = [
			{ isPrivate: false },
			...(searcherId ? [{ ownerId: searcherId }] : []),
		];

		const andConditions: Prisma.RecipeWhereInput[] = [];

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
		this.addCuisineFilter(filterConditions, filters.cuisineId);
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
	): Prisma.RecipeOrderByWithRelationInput {
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
		maxPreparationTime?: number
	): void {
		if (maxPreparationTime === undefined) return;

		conditions.preparationTime = { lte: maxPreparationTime };
	}

	private addServingNumberFilter(
		conditions: RecipeWhereInput,
		minServingNumber?: number,
		maxServingNumber?: number
	): void {
		if (minServingNumber === undefined && maxServingNumber === undefined)
			return;

		const servingsCondition: Prisma.IntFilter = {};

		if (minServingNumber !== undefined) {
			servingsCondition.gte = minServingNumber;
		}

		if (maxServingNumber !== undefined) {
			servingsCondition.lte = maxServingNumber;
		}

		conditions.servingsNumber = servingsCondition;
	}

	private addDifficultyFilter(
		conditions: RecipeWhereInput,
		difficultyLevel?: DifficultyLevel
	): void {
		if (difficultyLevel === undefined) return;

		conditions.difficultyLevel = difficultyLevel;
	}

	private addCuisineFilter(
		conditions: RecipeWhereInput,
		cuisineId?: string
	): void {
		if (cuisineId === undefined) return;

		conditions.cuisineId = cuisineId;
	}

	private addCategoryFilter(
		conditions: RecipeWhereInput,
		categoryIds?: string[]
	): void {
		if (!this.isNonEmptyArray(categoryIds)) return;

		conditions.categoryId = { in: categoryIds };
	}

	private addDietaryRestrictionFilter(
		conditions: RecipeWhereInput,
		dietaryRestrictionIds?: string[]
	): void {
		if (!this.isNonEmptyArray(dietaryRestrictionIds)) return;

		conditions.dietaryRestrictions = {
			some: {
				restrictionId: { in: dietaryRestrictionIds },
			},
		};
	}

	private isNonEmptyArray<T>(array?: T[]): array is T[] {
		return Array.isArray(array) && array.length > 0;
	}
}
