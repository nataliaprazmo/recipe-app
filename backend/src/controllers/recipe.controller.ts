import { FastifyReply, FastifyRequest } from "fastify";
import {
	CreateRecipeInput,
	RecipeFilterInput,
	UpdateRecipeInput,
} from "../types/recipe.types";
import { RecipeService } from "../services/recipe/recipe.service";
import { PrismaClient } from "@prisma/client";

class RecipeController {
	constructor(private recipeService: RecipeService) {}

	async createRecipe(
		request: FastifyRequest<{ Body: CreateRecipeInput }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const input = request.body;
			const ownerId = request.user.id;

			const recipe = await this.recipeService.createRecipe(
				input,
				ownerId
			);
			await reply.code(201).send({ message: "Added recipe", recipe });
		} catch (error) {
			request.log.error("Error creating recipe:", error);
			await reply.code(500).send({ error: "Failed to create recipe" });
		}
	}

	async getRecipeById(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const { id } = request.params;
			const userId = request.user.id;

			const recipe = await this.recipeService.getRecipeById(id, userId);

			if (!recipe) {
				await reply.code(404).send({ error: "Recipe not found" });
				return;
			}

			await reply.send({
				message: "Fetched recipe for given id",
				recipe,
			});
		} catch (error) {
			request.log.error("Error fetching recipe:", error);
			await reply.code(500).send({ error: "Failed to fetch recipe" });
		}
	}

	async getRecipesByUser(
		request: FastifyRequest<{
			Params: { userId?: string };
			Querystring: { includePrivate?: boolean };
		}>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const userId = request.params.userId
				? request.params.userId
				: request.user.id;
			const { includePrivate = false } = request.query;
			const requesterId = request.user.id;

			const shouldIncludePrivate =
				includePrivate && requesterId === userId;

			const recipes = await this.recipeService.getRecipesByUser(
				userId,
				shouldIncludePrivate
			);
			await reply.send({ message: "Fetched recipes for user", recipes });
		} catch (error) {
			request.log.error("Error fetching user recipes:", error);
			await reply
				.code(500)
				.send({ error: "Failed to fetch user recipes" });
		}
	}

	async getRecipeOfTheDay(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		try {
			const recipe = await this.recipeService.getRecipeOfTheDay();

			if (!recipe) {
				await reply
					.code(404)
					.send({ error: "No public recipes found" });
				return;
			}

			await reply.send({ message: "Fetched Recipe of the Day", recipe });
		} catch (error) {
			request.log.error("Error fetching Recipe of the Day:", error);
			await reply
				.code(500)
				.send({ error: "Failed to fetch Recipe of the Day" });
		}
	}

	async getPublicRecipes(
		request: FastifyRequest<{
			Querystring: { limit?: number; offset?: number };
		}>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const { limit, offset } = request.query;

			const recipes = await this.recipeService.getPublicRecipes(
				limit,
				offset
			);
			await reply.send({ message: "Fetched recipes", recipes });
		} catch (error) {
			request.log.error("Error fetching public recipes:", error);
			await reply
				.code(500)
				.send({ error: "Failed to fetch public recipes" });
		}
	}

	async toggleRecipePrivacy(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const { id } = request.params;
			const userId = request.user.id;

			const recipe = await this.recipeService.toggleRecipePrivacy(
				id,
				userId
			);
			await reply.send({ message: "Recipe privacy toggled", recipe });
		} catch (error) {
			request.log.error("Error toggling recipe's privacy:", error);
			if (error instanceof Error && error.message.includes("not found")) {
				await reply.code(404).send({ error: "Recipe not found" });
			} else if (
				error instanceof Error &&
				error.message.includes("permission")
			) {
				await reply.code(403).send({ error: "Permission denied" });
			} else {
				await reply
					.code(500)
					.send({ error: "Failed to toggle recipe's privacy" });
			}
		}
	}

	async updateRecipe(
		request: FastifyRequest<{
			Params: { id: string };
			Body: UpdateRecipeInput;
		}>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const { id } = request.params;
			const input = request.body;
			const userId = request.user.id;

			const recipe = await this.recipeService.updateRecipe(
				id,
				input,
				userId
			);
			await reply.send({ message: "Recipe updated", recipe });
		} catch (error) {
			request.log.error("Error updating recipe:", error);
			if (error instanceof Error && error.message.includes("not found")) {
				await reply.code(404).send({ error: "Recipe not found" });
			} else if (
				error instanceof Error &&
				error.message.includes("permission")
			) {
				await reply.code(403).send({ error: "Permission denied" });
			} else {
				await reply
					.code(500)
					.send({ error: "Failed to update recipe" });
			}
		}
	}

	async deleteRecipe(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const { id } = request.params;
			const userId = request.user.id;

			await this.recipeService.deleteRecipe(id, userId);
			await reply.code(204).send({ message: "Recipe deleted" });
		} catch (error) {
			request.log.error("Error deleting recipe:", error);
			if (error instanceof Error && error.message.includes("not found")) {
				await reply.code(404).send({ error: "Recipe not found" });
			} else if (
				error instanceof Error &&
				error.message.includes("permission")
			) {
				await reply.code(403).send({ error: "Permission denied" });
			} else {
				await reply
					.code(500)
					.send({ error: "Failed to delete recipe" });
			}
		}
	}

	async getFilteredAndSortedRecipes(
		request: FastifyRequest<{ Params: RecipeFilterInput }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const userId = request.user.id;
			const filters = request.params;
			const filteredRecipes =
				await this.recipeService.getFilteredAndSortedRecipes(
					filters,
					userId
				);
			await reply
				.status(200)
				.send({ message: "Fetched filtered recipes", filteredRecipes });
		} catch (error) {
			request.log.error("Error fetching recipes:", error);
			await reply.code(500).send({ error: "Error fetching recipes" });
		}
	}
}

export const createRecipeController = (
	prisma: PrismaClient
): RecipeController => {
	const recipeService = new RecipeService(prisma);
	return new RecipeController(recipeService);
};
