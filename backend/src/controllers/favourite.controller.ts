import { FavouriteRecipe, PrismaClient } from "@prisma/client";
import { FavouriteService } from "../services/favourite/favourite.service";
import { FastifyReply, FastifyRequest } from "fastify";

class FavouriteController {
	constructor(private favouriteService: FavouriteService) {}

	async getFavouritesByUserId(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		try {
			const userId = request.user.id;
			const favourites =
				await this.favouriteService.getFavouritesByUserId(userId);
			await reply.send({
				message: "Favourites for user fetched successfully",
				favourites,
			});
		} catch (error) {
			request.log.error("Error fetching favourite recipes", error);
			await reply
				.status(400)
				.send({ error: "Error fetching favourite recipes" });
		}
	}

	async addFavourite(
		request: FastifyRequest<{ Body: { recipeId: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const recipeId = request.body.recipeId;
			const ownerId = request.user.id;
			const newFavourite = await this.favouriteService.addFavourite({
				ownerId,
				recipeId,
			});
			await reply.status(201).send({
				message: "Favourite added successfully",
				newFavourite,
			});
		} catch (error) {
			console.log(error);
			request.log.error("Error adding favourite recipes", error);
			await reply
				.status(400)
				.send({ error: "Error adding favourite recipes" });
		}
	}

	async removeFavourite(
		request: FastifyRequest<{ Params: { recipeId: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const ownerId = request.user.id;
			const recipeId = request.params.recipeId;
			await this.favouriteService.removeFavourite({ ownerId, recipeId });
			await reply
				.status(204)
				.send({ message: "Favourite removed successfully" });
		} catch (error) {
			request.log.error("Error removing favourite recipes", error);
			await reply
				.status(400)
				.send({ error: "Error removing favourite recipes" });
		}
	}
}

export const createFavouriteController = (
	prisma: PrismaClient
): FavouriteController => {
	const favouriteService = new FavouriteService(prisma);
	return new FavouriteController(favouriteService);
};
