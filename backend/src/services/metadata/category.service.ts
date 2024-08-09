import { Category, PrismaClient } from "@prisma/client";
import { SearchService } from "../search.service";

export class CategoryService {
	private searchService: SearchService;

	constructor(private prisma: PrismaClient) {
		this.searchService = new SearchService(this.prisma);
	}

	async getAllCategories() {
		return this.prisma.category.findMany();
	}

	async searchCategories(
		searchTerm: string,
		limit?: string
	): Promise<Category[]> {
		return this.searchService.searchEntities(
			"category",
			"name",
			searchTerm,
			limit
		);
	}
}
