import { PrismaClient } from "@prisma/client";

export class CuisineService {
	constructor(private prisma: PrismaClient) {}

	async getAllCuisines() {
		return this.prisma.cuisine.findMany();
	}
}
