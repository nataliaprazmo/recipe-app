import { RecipeFilter } from "@/lib/types/data.types";

const addParam = (
	params: string[],
	key: string,
	value: string | number,
	encode = false
): void => {
	const encodedValue = encode
		? encodeURIComponent(value.toString())
		: value.toString();
	params.push(`${key}=${encodedValue}`);
};

const addArrayParam = (
	params: string[],
	key: string,
	value: string | string[]
): void => {
	if (Array.isArray(value)) {
		value.forEach((item) => addParam(params, key, item, true));
	} else {
		addParam(params, key, value, true);
	}
};

const addStringParameters = (params: string[], filter: RecipeFilter): void => {
	if (filter.searchTerm) {
		addParam(params, "searchTerm", filter.searchTerm, true);
	}
	if (filter.cuisineId) {
		addParam(params, "cuisineId", filter.cuisineId, true);
	}
};

const addNumericParameters = (params: string[], filter: RecipeFilter): void => {
	if (filter.maxPreparationTime !== undefined) {
		addParam(params, "maxPreparationTime", filter.maxPreparationTime);
	}
	if (filter.minServingNumber !== undefined) {
		addParam(params, "minServingNumber", filter.minServingNumber);
	}
	if (filter.maxServingNumber !== undefined) {
		addParam(params, "maxServingNumber", filter.maxServingNumber);
	}
	if (filter.limit !== undefined) {
		addParam(params, "limit", filter.limit);
	}
};

const addEnumParameters = (params: string[], filter: RecipeFilter): void => {
	if (filter.difficultyLevel) {
		addParam(params, "difficultyLevel", filter.difficultyLevel);
	}
};

const addSortingParameters = (params: string[], filter: RecipeFilter): void => {
	if (filter.sortBy) {
		addParam(params, "sortBy", filter.sortBy);
	}
	if (filter.sortOrder) {
		addParam(params, "sortOrder", filter.sortOrder);
	}
};

const addArrayParameters = (params: string[], filter: RecipeFilter): void => {
	if (filter.ingredientNames?.length) {
		filter.ingredientNames.forEach((ingredient) =>
			addParam(params, "ingredientNames", ingredient, true)
		);
	}
	if (filter.categoryIds) {
		addArrayParam(params, "categoryIds", filter.categoryIds);
	}
	if (filter.dietaryRestrictionIds) {
		addArrayParam(
			params,
			"dietaryRestrictionIds",
			filter.dietaryRestrictionIds
		);
	}
};

export const buildRecipeFilterQueryString = (filter: RecipeFilter): string => {
	const queryParams: string[] = [];

	addStringParameters(queryParams, filter);
	addNumericParameters(queryParams, filter);
	addEnumParameters(queryParams, filter);
	addSortingParameters(queryParams, filter);
	addArrayParameters(queryParams, filter);

	return queryParams.join("&");
};

export const createFilteredRecipesUrl = (filter: RecipeFilter): string => {
	const queryString = buildRecipeFilterQueryString(filter);
	return queryString ? queryString : "";
};
