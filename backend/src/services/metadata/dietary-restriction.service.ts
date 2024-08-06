import { PrismaClient } from "@prisma/client";

export class DietaryRestrictionsService {
	constructor(private prisma: PrismaClient) {}

	async getAllDietaryRestrictions() {
		return this.prisma.dietaryRestriction.findMany();
	}
}
