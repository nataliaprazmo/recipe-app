import { FastifyReply, FastifyRequest } from "fastify";
import { CreateIngredientInput } from "../types/ingredient.types";
import { IngredientService } from "../services/ingredient/ingredient.service";
import { PrismaClient } from "@prisma/client";

class IngredientController {
	constructor(private ingredientService: IngredientService) {}

	async createIngredient(
		request: FastifyRequest<{ Body: CreateIngredientInput }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const input = request.body;

			if (!this.ingredientService.validateIngredientName(input.name)) {
				await reply
					.code(400)
					.send({ error: "Invalid ingredient name" });
				return;
			}

			const ingredient = await this.ingredientService.createIngredient(
				input
			);
			await reply.code(201).send(ingredient);
		} catch (error) {
			request.log.error("Error creating ingredient:", error);
			if (
				error instanceof Error &&
				error.message.includes("already exists")
			) {
				await reply
					.code(409)
					.send({ error: "Ingredient already exists" });
			} else {
				await reply
					.code(500)
					.send({ error: "Failed to create ingredient" });
			}
		}
	}

	async createManyIngredients(
		request: FastifyRequest<{ Body: CreateIngredientInput[] }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const inputs = request.body;

			for (const input of inputs) {
				if (
					!this.ingredientService.validateIngredientName(input.name)
				) {
					await reply.code(400).send({
						error: `Invalid ingredient name: ${input.name}`,
					});
					return;
				}
			}

			const ingredients =
				await this.ingredientService.createManyIngredients(inputs);
			await reply.code(201).send(ingredients);
		} catch (error) {
			request.log.error("Error creating ingredients:", error);
			await reply
				.code(500)
				.send({ error: "Failed to create ingredients" });
		}
	}

	async getIngredientById(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const { id } = request.params;

			const ingredient = await this.ingredientService.getIngredientById(
				id
			);

			if (!ingredient) {
				await reply.code(404).send({ error: "Ingredient not found" });
				return;
			}

			await reply.send(ingredient);
		} catch (error) {
			request.log.error("Error fetching ingredient:", error);
			await reply.code(500).send({ error: "Failed to fetch ingredient" });
		}
	}

	async getIngredientByName(
		request: FastifyRequest<{ Params: { name: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const { name } = request.params;

			const ingredient = await this.ingredientService.getIngredientByName(
				decodeURIComponent(name)
			);

			if (!ingredient) {
				await reply.code(404).send({ error: "Ingredient not found" });
				return;
			}

			await reply.send(ingredient);
		} catch (error) {
			request.log.error("Error fetching ingredient by name:", error);
			await reply.code(500).send({ error: "Failed to fetch ingredient" });
		}
	}

	async getIngredientsByNames(
		request: FastifyRequest<{ Body: { names: string[] } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const { names } = request.body;

			if (!Array.isArray(names)) {
				await reply.code(400).send({ error: "Names must be an array" });
				return;
			}

			const ingredients =
				await this.ingredientService.getIngredientsByNames(names);
			await reply.send(ingredients);
		} catch (error) {
			request.log.error("Error fetching ingredients by names:", error);
			await reply
				.code(500)
				.send({ error: "Failed to fetch ingredients" });
		}
	}

	async getAllIngredients(
		request: FastifyRequest<{
			Querystring: { limit?: number; offset?: number };
		}>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const { limit, offset } = request.query;

			const ingredients = await this.ingredientService.getAllIngredients(
				limit,
				offset
			);
			await reply.send(ingredients);
		} catch (error) {
			request.log.error("Error fetching all ingredients:", error);
			await reply
				.code(500)
				.send({ error: "Failed to fetch ingredients" });
		}
	}

	async searchIngredients(
		request: FastifyRequest<{
			Querystring: { q: string; limit?: number };
		}>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const { q: searchTerm, limit } = request.query;

			if (!searchTerm || typeof searchTerm !== "string") {
				await reply
					.code(400)
					.send({ error: "Search term is required" });
				return;
			}

			const ingredients = await this.ingredientService.searchIngredients(
				searchTerm,
				limit
			);
			await reply.send(ingredients);
		} catch (error) {
			request.log.error("Error searching ingredients:", error);
			await reply
				.code(500)
				.send({ error: "Failed to search ingredients" });
		}
	}

	async getIngredientsCount(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		try {
			const count = await this.ingredientService.getIngredientsCount();
			await reply.send({ count });
		} catch (error) {
			request.log.error("Error getting ingredients count:", error);
			await reply
				.code(500)
				.send({ error: "Failed to get ingredients count" });
		}
	}
}

export const createIngredientController = (
	prisma: PrismaClient
): IngredientController => {
	const ingredientService = new IngredientService(prisma);
	return new IngredientController(ingredientService);
};
