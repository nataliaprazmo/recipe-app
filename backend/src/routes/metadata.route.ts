import { FastifyInstance } from "fastify";
import { createMetadataController } from "../controllers/metadata.controller";
import {
	Category,
	Cuisine,
	DietaryRestriction,
	DifficultyLevel,
	MeasureUnit,
} from "@prisma/client";

export default async function metadataRoutes(fastify: FastifyInstance) {
	const metadataController = createMetadataController(fastify.prisma);

	fastify.get<{
		Reply: { message: string; dietaryRestrictions: DietaryRestriction[] };
	}>(
		"/dietary-restrictions",
		metadataController.getDietaryRestrictions.bind(metadataController)
	);

	fastify.get<{
		Querystring: { searchTerm: string; limit?: string };
		Reply: { message: string; results: DietaryRestriction[] };
	}>(
		"/dietary-restrictions/search",
		metadataController.searchDietaryRestrictions.bind(metadataController)
	);

	fastify.get<{
		Reply: { message: string; categories: Category[] } | { error: string };
	}>(
		"/categories",
		metadataController.getCategories.bind(metadataController)
	);

	fastify.get<{
		Querystring: { searchTerm: string; limit?: string };
		Reply: { message: string; results: Category[] };
	}>(
		"/categories/search",
		metadataController.searchCategories.bind(metadataController)
	);

	fastify.get<{
		Reply: { message: string; cuisines: Cuisine[] };
	}>("/cuisines", metadataController.getCuisines.bind(metadataController));

	fastify.get<{
		Querystring: { searchTerm: string; limit?: string };
		Reply: { message: string; results: Cuisine[] };
	}>(
		"/cuisines/search",
		metadataController.searchCuisines.bind(metadataController)
	);

	fastify.get<{
		Reply: { message: string; measureUnits: MeasureUnit[] };
	}>(
		"/measure-units",
		metadataController.getMeasureUnits.bind(metadataController)
	);

	fastify.get<{
		Querystring: { searchTerm: string; limit?: string };
		Reply: { message: string; results: MeasureUnit[] };
	}>(
		"/measure-units/search",
		metadataController.searchMeasureUnits.bind(metadataController)
	);

	fastify.get<{
		Reply: { message: string; difficultyLevels: DifficultyLevel[] };
	}>(
		"/difficulty-levels",
		metadataController.getDifficultyLevels.bind(metadataController)
	);
}
