import { FastifyRequest, FastifyReply } from "fastify";
import { getAllCuisines } from "../services/metadata/cuisine.service";
import { getAllCategories } from "../services/metadata/category.service";
import { getAllMeasureUnits } from "../services/metadata/measure-unit.service";
import { getAllDifficultyLevels } from "../services/metadata/difficulty-level.service";
import { getAllDietaryRestrictions } from "../services/metadata/dietary-restriction.service";

export async function getCategories(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const categories = await getAllCategories(request.server);
		reply.send({ message: "Categories fetched successfully", categories });
	} catch (error) {
		reply.status(500).send({ message: "Error fetching categories", error });
	}
}

export async function getCuisines(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const cuisines = await getAllCuisines(request.server);
		reply.send({ message: "Cuisines fetched successfully", cuisines });
	} catch (error) {
		reply.status(500).send({ message: "Error fetching cuisines", error });
	}
}

export async function getMeasureUnits(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const measureUnits = await getAllMeasureUnits(request.server);
		reply.send({
			message: "Measure units fetched successfully",
			measureUnits,
		});
	} catch (error) {
		reply
			.status(500)
			.send({ message: "Error fetching measure units", error });
	}
}

export function getDifficultyLevels(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const difficultyLevels = getAllDifficultyLevels();
		reply.send({
			message: "Difficulty levels fetched successfully",
			difficultyLevels,
		});
	} catch (error) {
		reply
			.status(500)
			.send({ message: "Error fetching difficulty levels", error });
	}
}

export async function getDietaryRestrictions(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const dietaryRestrictions = await getAllDietaryRestrictions(
			request.server
		);
		reply.send({
			message: "Dietary restrictions fetched successfully",
			dietaryRestrictions,
		});
	} catch (error) {
		reply
			.status(500)
			.send({ message: "Error fetching dietary restrictions", error });
	}
}
