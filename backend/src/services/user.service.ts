import { FastifyInstance } from "fastify";
import { CreateUserInput, UpdateUserInput } from "../types/user.types";

export async function getAllUsers(fastify: FastifyInstance) {
	return fastify.prisma.user.findMany();
}

export async function getUserById(fastify: FastifyInstance, id: string) {
	return fastify.prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(fastify: FastifyInstance, email: string) {
	return fastify.prisma.user.findUnique({ where: { email } });
}

export async function createUser(
	fastify: FastifyInstance,
	data: CreateUserInput
) {
	return fastify.prisma.user.create({ data });
}

export async function updateUser(
	fastify: FastifyInstance,
	id: string,
	data: UpdateUserInput
) {
	return fastify.prisma.user.update({
		where: { id },
		data,
	});
}

export async function updateUserPassword(
	fastify: FastifyInstance,
	id: string,
	password: string
) {
	return fastify.prisma.user.update({
		where: { id },
		data: { password },
	});
}

export async function deleteUser(fastify: FastifyInstance, id: string) {
	return fastify.prisma.user.delete({ where: { id } });
}
