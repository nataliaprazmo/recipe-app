import { PrismaClient } from "@prisma/client";

export class MeasureUnitService {
	constructor(private prisma: PrismaClient) {}
	async getAllMeasureUnits() {
		return this.prisma.measureUnit.findMany();
	}
}
