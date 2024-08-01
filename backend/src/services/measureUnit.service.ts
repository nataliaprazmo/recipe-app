import { FastifyInstance } from "fastify";

export async function getAllMeasureUnits(fastify: FastifyInstance) {
	return fastify.prisma.measureUnit.findMany();
}
