import { FastifyInstance } from "fastify";

export async function getAllCuisines(fastify: FastifyInstance) {
	return fastify.prisma.cuisine.findMany();
}
