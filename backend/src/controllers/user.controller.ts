import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/user/user.service";
import {
	ChangeUserPasswordInput,
	CreateUserInput,
	UpdateUserInput,
} from "../types/user.types";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

class UserController {
	constructor(private userService: UserService) {}

	async createUser(
		request: FastifyRequest<{ Body: CreateUserInput }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const user = await this.userService.getUserByEmail(
				request.body.email
			);
			if (user) {
				await reply.code(401).send({
					error: "There is already an account with this email",
				});
				return;
			}

			const hashedPassword = await bcrypt.hash(request.body.password, 10);
			const userData = { ...request.body, password: hashedPassword };
			const newUser = await this.userService.createUser(userData);

			await reply.code(201).send({ message: "Account created", newUser });
		} catch (error) {
			request.log.error("Error creating user:", error);
			await reply.code(500).send({ error: "Failed to create user" });
		}
	}

	async getAllUsers(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		try {
			const users = await this.userService.getAllUsers();
			await reply.send({ message: "Users fetched successfully", users });
		} catch (error) {
			request.log.error("Error fetching users:", error);
			await reply.code(500).send({ error: "Failed to fetch users" });
		}
	}

	async getUserById(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		try {
			const userId = request.user.id;

			const user = await this.userService.getUserById(userId);
			if (!user) {
				await reply.code(404).send({ error: "User not found" });
				return;
			}

			await reply.send({ message: "User fetched successfully", user });
		} catch (error) {
			request.log.error("Error fetching user:", error);
			await reply.code(500).send({ error: "Failed to fetch user" });
		}
	}

	async getUserByEmail(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		try {
			const email = request.user.email;

			request.log.info("Decoded user from JWT:", request.user);
			request.log.info("Fetching user with email:", email);

			const user = await this.userService.getUserByEmail(email);
			if (!user) {
				await reply.code(404).send({ error: "User not found" });
				return;
			}

			await reply.send({ message: "User fetched successfully", user });
		} catch (error) {
			request.log.error("Error fetching user:", error);
			await reply.code(500).send({ error: "Failed to fetch user" });
		}
	}

	async updateUser(
		request: FastifyRequest<{ Body: UpdateUserInput }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const userId = request.user.id;

			const data = request.body;
			const updatedUser = await this.userService.updateUser(userId, data);

			await reply.send({
				message: "User updated successfully",
				updatedUser,
			});
		} catch (error) {
			request.log.error("Error updating user:", error);
			await reply.code(500).send({ error: "Failed to update user" });
		}
	}

	async updateUserPassword(
		request: FastifyRequest<{ Body: ChangeUserPasswordInput }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const { currentPassword, newPassword, newPassword2 } = request.body;
			const userId = request.user.id;

			if (newPassword !== newPassword2) {
				await reply
					.code(400)
					.send({ error: "New passwords do not match." });
				return;
			}

			if (currentPassword === newPassword) {
				await reply
					.code(400)
					.send({ error: "New password is the same as old one." });
				return;
			}

			const user = await this.userService.getUserById(userId);
			if (!user) {
				await reply.code(404).send({ error: "User not found." });
				return;
			}

			const passwordMatch = await bcrypt.compare(
				currentPassword,
				user.password
			);
			if (!passwordMatch) {
				await reply
					.code(400)
					.send({ error: "Old password is incorrect." });
				return;
			}

			const hashedPassword = await bcrypt.hash(newPassword, 10);
			const updatedUser = await this.userService.updateUserPassword(
				userId,
				hashedPassword
			);

			await reply.send({
				message: "Password updated successfully.",
				updatedUser,
			});
		} catch (error) {
			request.log.error("Error updating password:", error);
			await reply.code(500).send({ error: "Failed to update password" });
		}
	}

	async deleteUser(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		try {
			const userId = request.user.id;

			await this.userService.deleteUser(userId);
			await reply.code(204).send({ message: "Account deleted" });
		} catch (error) {
			request.log.error("Error deleting account:", error);
			await reply.code(500).send({ error: "Failed to delete account" });
		}
	}
}

export const createUserController = (prisma: PrismaClient): UserController => {
	const userService = new UserService(prisma);
	return new UserController(userService);
};
