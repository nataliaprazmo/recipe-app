import { FastifyInstance } from "fastify";
import * as MetadataController from "../controllers/metadata.controller";

export default async function metadataRoutes(fastify: FastifyInstance) {
	fastify.get(
		"/dietary-restrictions",
		MetadataController.getDietaryRestrictions
	);
	fastify.get("/categories", MetadataController.getCategories);
	fastify.get("/cuisines", MetadataController.getCuisines);
	fastify.get("/measure-units", MetadataController.getMeasureUnits);
	fastify.get("/difficulty-levels", MetadataController.getDifficultyLevels);
}
