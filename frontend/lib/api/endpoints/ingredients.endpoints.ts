export const INGREDIENTS_ENDPOINTS = {
	BASE: "/api/ingredients",
	BY_NAME: (name: string) =>
		`/api/ingredients/name/${encodeURIComponent(name)}`,
	BY_ID: (id: string) => `/api/ingredients/${id}`,
	SEARCH: (searchTerm: string) =>
		`/api/ingredients/search?searchTerm=${searchTerm}`,
} as const;
