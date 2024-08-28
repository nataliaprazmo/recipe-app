export const METADATA_ENDPOINTS = {
	CATEGORIES: {
		BASE: "/api/categories",
		SEARCH: (searchTerm: string) =>
			`/api/categories/search?searchTerm=${searchTerm}`,
	},
	CUISINES: {
		BASE: "/api/cuisines",
		SEARCH: (searchTerm: string) =>
			`/api/cuisines/search?searchTerm=${searchTerm}`,
	},
	DIETARY_RESTRICTIONS: {
		BASE: "/api/dietary-restrictions",
		SEARCH: (searchTerm: string) =>
			`/api/dietary-restrictions/search?searchTerm=${searchTerm}`,
	},
	DIFFICULTY_LEVELS: "/api/difficulty-levels",
	MEASURE_UNITS: {
		BASE: "/api/measure-units",
		SEARCH: (searchTerm: string) =>
			`/api/measure-units/search?searchTerm=${searchTerm}`,
	},
} as const;
