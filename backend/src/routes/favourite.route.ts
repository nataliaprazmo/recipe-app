import { FastifyInstance } from "fastify";
import { createFavouriteController } from "../controllers/favourite.controller";
import { FavouriteRecipe } from "@prisma/client";

export async function userFavouriteRoutes(fastify: FastifyInstance) {
	const favouriteController = createFavouriteController(fastify.prisma);

	fastify.get<{ Reply: FavouriteRecipe[] | { error: string } }>(
		"/",
		{ preHandler: [fastify.auth] },
		favouriteController.getFavouritesByUserId.bind(favouriteController)
	);

	fastify.post<{ Body: { recipeId: string }; Reply: FavouriteRecipe }>(
		"/",
		{ preHandler: [fastify.auth] },
		favouriteController.addFavourite.bind(favouriteController)
	);

	fastify.delete<{
		Params: { recipeId: string };
		Reply: { message: string } | { error: string };
	}>(
		"/:recipeId",
		{ preHandler: [fastify.auth] },
		favouriteController.removeFavourite.bind(favouriteController)
	);

	fastify.get<{
		Params: { recipeId: string };
		Reply: boolean | { error: string };
	}>(
		"/:recipeId",
		{ preHandler: [fastify.auth] },
		favouriteController.getIsFavourited.bind(favouriteController)
	);
}
