import { Cuisine, PrismaClient } from "@prisma/client";
import { SearchService } from "../search.service";

export class CuisineService {
	private searchService: SearchService;

	constructor(private prisma: PrismaClient) {
		this.searchService = new SearchService(this.prisma);
	}

	async getAllCuisines() {
		return this.prisma.cuisine.findMany();
	}

	async searchCuisines(
		searchTerm: string,
		limit?: string
	): Promise<Cuisine[]> {
		return this.searchService.searchEntities(
			"cuisine",
			"name",
			searchTerm,
			limit
		);
	}
}
