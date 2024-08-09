import { MeasureUnit, PrismaClient } from "@prisma/client";
import { SearchService } from "../search.service";

export class MeasureUnitService {
	private searchService: SearchService;

	constructor(private prisma: PrismaClient) {
		this.searchService = new SearchService(this.prisma);
	}

	async getAllMeasureUnits() {
		return this.prisma.measureUnit.findMany();
	}

	async searchMeasureUnits(
		searchTerm: string,
		limit?: string
	): Promise<MeasureUnit[]> {
		return this.searchService.searchEntities(
			"measureUnit",
			"name",
			searchTerm,
			limit
		);
	}
}
