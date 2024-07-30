import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { categories } from "./categories";
import { cuisines } from "./cuisines";
import { dietaryRestrictions } from "./dietaryRestrictions";
import { measureUnits } from "./measureUnits";
dotenv.config();
const prisma = new PrismaClient();

async function seed() {
	for (const name of categories) {
		await prisma.category.create({
			data: { name },
		});
	}

	for (const name of cuisines) {
		await prisma.cuisine.create({
			data: { name },
		});
	}

	for (const name of dietaryRestrictions) {
		await prisma.dietaryRestriction.create({
			data: { name },
		});
	}

	for (const name of measureUnits) {
		await prisma.measureUnit.create({
			data: { name },
		});
	}

	console.log("Seeding completed successfully.");
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
