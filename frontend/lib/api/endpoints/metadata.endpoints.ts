export const METADATA_ENDPOINTS = {
	CATEGORIES: {
		BASE: "/categories",
		SEARCH: (searchTerm: string) =>
			`/categories/search?searchTerm=${searchTerm}`,
	},
	CUISINES: {
		BASE: "/cuisines",
		SEARCH: (searchTerm: string) =>
			`/cuisines/search?searchTerm=${searchTerm}`,
	},
	DIETARY_RESTRICTIONS: {
		BASE: "/dietary-restrictions",
		SEARCH: (searchTerm: string) =>
			`/dietary-restrictions/search?searchTerm=${searchTerm}`,
	},
	DIFFICULTY_LEVELS: "/difficulty-levels",
	MEASURE_UNITS: {
		BASE: "/measure-units",
		SEARCH: (searchTerm: string) =>
			`/measure-units/search?searchTerm=${searchTerm}`,
	},
} as const;
