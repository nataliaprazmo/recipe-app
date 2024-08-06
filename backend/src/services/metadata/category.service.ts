import { PrismaClient } from "@prisma/client";

export class CategoryService {
	constructor(private prisma: PrismaClient) {}

	async getAllCategories() {
		return this.prisma.category.findMany();
	}
}
