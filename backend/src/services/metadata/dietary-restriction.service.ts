import { DietaryRestriction, PrismaClient } from "@prisma/client";
import { SearchService } from "../search.service";

export class DietaryRestrictionsService {
	private searchService: SearchService;

	constructor(private prisma: PrismaClient) {
		this.searchService = new SearchService(this.prisma);
	}

	async getAllDietaryRestrictions() {
		return this.prisma.dietaryRestriction.findMany();
	}

	async searchDietaryRestrictions(
		searchTerm: string,
		limit?: string
	): Promise<DietaryRestriction[]> {
		return this.searchService.searchEntities(
			"dietaryRestriction",
			"name",
			searchTerm,
			limit
		);
	}
}
