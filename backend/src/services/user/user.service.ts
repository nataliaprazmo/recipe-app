import { CreateUserInput, UpdateUserInput } from "../../types/user.types";
import { PrismaClient, User } from "@prisma/client";

export class UserService {
	constructor(private prisma: PrismaClient) {}

	async getAllUsers(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async getUserById(id: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { id } });
	}

	async getUserByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { email } });
	}

	async createUser(data: CreateUserInput): Promise<User> {
		return this.prisma.user.create({ data });
	}

	async updateUser(id: string, data: UpdateUserInput): Promise<User> {
		return this.prisma.user.update({
			where: { id },
			data,
		});
	}

	async updateUserPassword(id: string, password: string): Promise<User> {
		return this.prisma.user.update({
			where: { id },
			data: { password },
		});
	}

	async deleteUser(id: string): Promise<User> {
		return this.prisma.user.delete({ where: { id } });
	}
}
