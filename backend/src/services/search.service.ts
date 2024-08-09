import {
	PrismaClient,
	MeasureUnit,
	Category,
	Cuisine,
	DietaryRestriction,
} from "@prisma/client";

type ModelMap = {
	category: Category;
	cuisine: Cuisine;
	dietaryRestriction: DietaryRestriction;
	measureUnit: MeasureUnit;
};

export class SearchService {
	constructor(private readonly prisma: PrismaClient) {}

	private parseLimit(limit?: string | number): number {
		if (typeof limit === "number") return limit;
		if (!limit) return 10;

		const parsed = parseInt(limit, 10);
		return isNaN(parsed) ? 10 : parsed;
	}

	async searchEntities<
		ModelName extends keyof ModelMap,
		FieldName extends keyof ModelMap[ModelName] & string
	>(
		model: ModelName,
		field: FieldName,
		searchTerm: string,
		limit?: string | number
	): Promise<ModelMap[ModelName][]> {
		const normalizedSearch = searchTerm.trim().toLowerCase();
		const parsedLimit = this.parseLimit(limit);

		const modelDelegate = this.prisma[model] as unknown as {
			findMany: (args: any) => Promise<ModelMap[ModelName][]>;
		};

		return modelDelegate.findMany({
			where: {
				[field]: {
					contains: normalizedSearch,
				},
			},
			take: parsedLimit,
			orderBy: {
				[field]: "asc",
			},
		});
	}
}
