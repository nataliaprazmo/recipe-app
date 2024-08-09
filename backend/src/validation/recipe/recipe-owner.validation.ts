import { PrismaClient } from "@prisma/client";

export async function validateOwner(
	prisma: PrismaClient,
	ownerId: string,
	errors: string[]
): Promise<void> {
	try {
		const owner = await prisma.user.findUnique({ where: { id: ownerId } });
		if (!owner) errors.push("Invalid owner ID");
	} catch {
		errors.push("Invalid owner ID format");
	}
}
