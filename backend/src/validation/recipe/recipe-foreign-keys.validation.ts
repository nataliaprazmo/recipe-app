import { PrismaClient } from "@prisma/client";
import { CreateRecipeInput } from "../../types/recipe.types";

export async function validateForeignKeys(
	prisma: PrismaClient,
	input: CreateRecipeInput,
	errors: string[]
): Promise<void> {
	const checks: Promise<number | void>[] = [];

	if (input.categoryId) {
		checks.push(
			prisma.category
				.findUnique({ where: { id: input.categoryId } })
				.then((res) => {
					if (!res) errors.push("Invalid category ID");
				})
				.catch(() => errors.push("Invalid category ID format"))
		);
	}

	if (input.cuisineId) {
		checks.push(
			prisma.cuisine
				.findUnique({ where: { id: input.cuisineId } })
				.then((res) => {
					if (!res) errors.push("Invalid cuisine ID");
				})
				.catch(() => errors.push("Invalid cuisine ID format"))
		);
	}

	if (input.dietaryRestrictionIds?.length > 0) {
		const uniqueIds = [...new Set(input.dietaryRestrictionIds)];
		if (uniqueIds.length !== input.dietaryRestrictionIds.length) {
			errors.push("Duplicate dietary restriction IDs found");
		}

		checks.push(
			prisma.dietaryRestriction
				.findMany({ where: { id: { in: uniqueIds } } })
				.then((results) => {
					if (results.length !== uniqueIds.length) {
						errors.push(
							"One or more dietary restriction IDs are invalid"
						);
					}
				})
				.catch(() =>
					errors.push("Invalid dietary restriction ID format")
				)
		);
	}

	await Promise.allSettled(checks);
}
