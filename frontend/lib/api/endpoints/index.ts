import { AUTH_ENDPOINTS } from "./auth.endpoints";
import { INGREDIENTS_ENDPOINTS } from "./ingredients.endpoints";
import { METADATA_ENDPOINTS } from "./metadata.endpoints";
import { RECIPES_ENDPOINTS } from "./recipes.endpoints";
import { USERS_ENDPOINTS } from "./users.endpoints";

export const ENDPOINTS = {
	AUTH: AUTH_ENDPOINTS,
	METADATA: METADATA_ENDPOINTS,
	USERS: USERS_ENDPOINTS,
	INGREDIENTS: INGREDIENTS_ENDPOINTS,
	RECIPES: RECIPES_ENDPOINTS,
} as const;

type EndpointBuilder =
	| string
	| {
			[key: string]: EndpointBuilder | ((...args: any[]) => string);
	  };

export type Endpoints = {
	[K in keyof typeof ENDPOINTS]: (typeof ENDPOINTS)[K] extends EndpointBuilder
		? (typeof ENDPOINTS)[K]
		: {
				[P in keyof (typeof ENDPOINTS)[K]]: (typeof ENDPOINTS)[K][P] extends EndpointBuilder
					? (typeof ENDPOINTS)[K][P]
					: never;
		  };
};
