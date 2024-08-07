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

	async getCategories(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		try {
			const categories = await this.categoryService.getAllCategories();
			await reply.send({
				message: "Categories fetched successfully",
				categories,
			});
		} catch (error) {
			request.log.error("Error fetching categories", error);
			await reply
				.status(500)
				.send({ message: "Error fetching categories", error });
		}
	}

	async getCuisines(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		try {
			const cuisines = await this.cuisineService.getAllCuisines();
			await reply.send({
				message: "Cuisines fetched successfully",
				cuisines,
			});
		} catch (error) {
			request.log.error("Error fetching cuisines", error);
			await reply
				.status(500)
				.send({ message: "Error fetching cuisines", error });
		}
	}

	async getMeasureUnits(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		try {
			const measureUnits =
				await this.measureUnitService.getAllMeasureUnits();
			await reply.send({
				message: "Measure units fetched successfully",
				measureUnits,
			});
		} catch (error) {
			request.log.error("Error fetching measure units", error);
			await reply
				.status(500)
				.send({ message: "Error fetching measure units", error });
		}
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
		try {
			const dietaryRestrictions =
				await this.dietaryRestrictionsService.getAllDietaryRestrictions();
			await reply.send({
				message: "Dietary restrictions fetched successfully",
				dietaryRestrictions,
			});
		} catch (error) {
			request.log.error("Error fetching dietary restrictions", error);
			await reply.status(500).send({
				message: "Error fetching dietary restrictions",
				error,
			});
		}
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
