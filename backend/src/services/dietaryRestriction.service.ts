import { FastifyInstance } from "fastify";

export async function getAllDietaryRestrictions(fastify: FastifyInstance) {
	return fastify.prisma.dietaryRestriction.findMany();
}
