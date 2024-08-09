import { FastifyRequest, FastifyReply } from "fastify";
import { getAllDifficultyLevels } from "../services/metadata/difficulty-level.service";
import { CategoryService } from "../services/metadata/category.service";
import { PrismaClient } from "@prisma/client";
import { CuisineService } from "../services/metadata/cuisine.service";
import { MeasureUnitService } from "../services/metadata/measure-unit.service";
import { DietaryRestrictionsService } from "../services/metadata/dietary-restriction.service";

class MetadataController {
	constructor(
		private categoryService: CategoryService,
		private cuisineService: CuisineService,
		private measureUnitService: MeasureUnitService,
		private dietaryRestrictionsService: DietaryRestrictionsService
	) {}

	private async handleGetAll<T>(
		reply: FastifyReply,
		serviceMethod: () => Promise<T>,
		successMessage: string,
		errorMessage: string
	): Promise<void> {
		try {
			const data = await serviceMethod();
			await reply.send({ message: successMessage, ...data });
		} catch (error) {
			reply.log?.error?.(error);
			await reply.status(500).send({ message: errorMessage, error });
		}
	}

	private async handleSearch<T>(
		request: FastifyRequest<{
			Querystring: { searchTerm: string; limit?: string };
		}>,
		reply: FastifyReply,
		searchMethod: (term: string, limit?: string) => Promise<T[]>,
		successMessage: string,
		errorMessage: string
	): Promise<void> {
		try {
			const { searchTerm, limit } = request.query;
			const results = await searchMethod(searchTerm, limit);
			await reply.send({
				message: successMessage,
				results,
				meta: {
					limit: limit ? parseInt(limit, 10) : 10,
				},
			});
		} catch (error) {
			reply.log?.error?.(error);
			await reply.status(500).send({ message: errorMessage, error });
		}
	}

	async getCategories(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		await this.handleGetAll(
			reply,
			() =>
				this.categoryService
					.getAllCategories()
					.then((categories) => ({ categories })),
			"Categories fetched successfully",
			"Error fetching categories"
		);
	}

	async searchCategories(
		request: FastifyRequest<{
			Querystring: { searchTerm: string; limit?: string };
		}>,
		reply: FastifyReply
	): Promise<void> {
		await this.handleSearch(
			request,
			reply,
			this.categoryService.searchCategories.bind(this.categoryService),
			"Searched categories",
			"Error searching categories"
		);
	}

	async getCuisines(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		await this.handleGetAll(
			reply,
			() =>
				this.cuisineService
					.getAllCuisines()
					.then((cuisines) => ({ cuisines })),
			"Cuisines fetched successfully",
			"Error fetching cuisines"
		);
	}

	async searchCuisines(
		request: FastifyRequest<{
			Querystring: { searchTerm: string; limit?: string };
		}>,
		reply: FastifyReply
	): Promise<void> {
		await this.handleSearch(
			request,
			reply,
			this.cuisineService.searchCuisines.bind(this.cuisineService),
			"Searched cuisines",
			"Error searching cuisines"
		);
	}

	async getMeasureUnits(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		await this.handleGetAll(
			reply,
			() =>
				this.measureUnitService
					.getAllMeasureUnits()
					.then((measureUnits) => ({ measureUnits })),
			"Measure units fetched successfully",
			"Error fetching measure units"
		);
	}

	async searchMeasureUnits(
		request: FastifyRequest<{
			Querystring: { searchTerm: string; limit?: string };
		}>,
		reply: FastifyReply
	): Promise<void> {
		await this.handleSearch(
			request,
			reply,
			this.measureUnitService.searchMeasureUnits.bind(
				this.measureUnitService
			),
			"Searched measure units",
			"Error searching measure units"
		);
	}

	async getDifficultyLevels(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		try {
			const difficultyLevels = getAllDifficultyLevels();
			await reply.send({
				message: "Difficulty levels fetched successfully",
				difficultyLevels,
			});
		} catch (error) {
			request.log.error("Error fetching difficulty levels", error);
			await reply
				.status(500)
				.send({ message: "Error fetching difficulty levels", error });
		}
	}

	async getDietaryRestrictions(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		await this.handleGetAll(
			reply,
			() =>
				this.dietaryRestrictionsService
					.getAllDietaryRestrictions()
					.then((dietaryRestrictions) => ({ dietaryRestrictions })),
			"Dietary restrictions fetched successfully",
			"Error fetching dietary restrictions"
		);
	}

	async searchDietaryRestrictions(
		request: FastifyRequest<{
			Querystring: { searchTerm: string; limit?: string };
		}>,
		reply: FastifyReply
	): Promise<void> {
		await this.handleSearch(
			request,
			reply,
			this.dietaryRestrictionsService.searchDietaryRestrictions.bind(
				this.dietaryRestrictionsService
			),
			"Searched dietary restriction",
			"Error searching dietary restrictions"
		);
	}
}

export const createMetadataController = (
	prisma: PrismaClient
): MetadataController => {
	const categoryService = new CategoryService(prisma);
	const cuisineService = new CuisineService(prisma);
	const measureUnitService = new MeasureUnitService(prisma);
	const dietaryRestrictionsService = new DietaryRestrictionsService(prisma);
	return new MetadataController(
		categoryService,
		cuisineService,
		measureUnitService,
		dietaryRestrictionsService
	);
};
