import { FavouriteRecipe, PrismaClient } from "@prisma/client";

export class FavouriteService {
	constructor(private prisma: PrismaClient) {}

	async getFavouritesByUserId(
		ownerId: string
	): Promise<FavouriteRecipe[] | null> {
		return this.prisma.favouriteRecipe.findMany({
			where: { ownerId },
			include: { favouritedRecipe: true },
		});
	}

	async addFavourite(data: FavouriteRecipe): Promise<FavouriteRecipe> {
		return this.prisma.favouriteRecipe.create({
			data,
		});
	}

	async removeFavourite(data: FavouriteRecipe): Promise<FavouriteRecipe> {
		return this.prisma.favouriteRecipe.delete({
			where: { ownerId_recipeId: data },
		});
	}
}
