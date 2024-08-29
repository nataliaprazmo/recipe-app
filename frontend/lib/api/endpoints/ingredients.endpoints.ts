export const INGREDIENTS_ENDPOINTS = {
	BASE: "/ingredients",
	BY_NAME: (name: string) => `/ingredients/name/${encodeURIComponent(name)}`,
	BY_ID: (id: string) => `/ingredients/${id}`,
	SEARCH: (searchTerm: string) =>
		`/ingredients/search?searchTerm=${searchTerm}`,
} as const;
