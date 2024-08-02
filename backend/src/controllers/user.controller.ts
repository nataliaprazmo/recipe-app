import { FastifyRequest, FastifyReply } from "fastify";
import * as UserService from "../services/user/user.service";
import {
	ChangeUserPasswordInput,
	CreateUserInput,
	LoginInput,
	UpdateUserInput,
} from "../types/user.types";
const bcrypt = require("bcrypt");

export async function createUser(
	request: FastifyRequest<{ Body: CreateUserInput }>,
	reply: FastifyReply
) {
	try {
		const user = await UserService.getUserByEmail(
			request.server,
			request.body.email
		);
		if (user) {
			return reply.status(401).send({
				message: "There is already an account with this email",
			});
		}
		const hashedPassword = await bcrypt.hash(request.body.password, 10);
		const userData = { ...request.body, password: hashedPassword };
		const newUser = await UserService.createUser(request.server, userData);
		reply.status(201).send({ message: "Account created", newUser });
	} catch (error) {
		reply.status(500).send({ message: "Error creating user", error });
	}
}

export async function loginUser(
	request: FastifyRequest<{ Body: LoginInput }>,
	reply: FastifyReply
) {
	try {
		const { email, password } = request.body;
		const user = await UserService.getUserByEmail(request.server, email);
		if (!user) {
			return reply.status(409).send({ message: "Invalid email" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return reply.status(409).send({ message: "Invalid password" });
		}
		return reply
			.status(200)
			.send({ message: "User logged in successfully" });
	} catch (error) {
		reply.status(500).send({ message: "Error loging user in", error });
	}
}

export async function getAllUsers(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const users = await UserService.getAllUsers(request.server);
		reply.send({ message: "Users fetched successfully", users });
	} catch (error) {
		reply.status(500).send({ message: "Error fetching users", error });
	}
}

export async function getUserById(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const userId = request.user.id;
		const user = await UserService.getUserById(request.server, userId);
		if (!user) {
			return reply.status(404).send({ message: "User not found" });
		}
		reply.send({ message: "User fetched successfully", user });
	} catch (error) {
		reply.status(500).send({ message: "Error fetching user", error });
	}
}

export async function getUserByEmail(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		console.log("Decoded user from JWT:", request.user);
		const email = request.user.email;
		console.log("Fetching user with email:", email);
		const user = await UserService.getUserByEmail(request.server, email);
		if (!user) {
			return reply.status(404).send({ message: "User not found" });
		}
		reply.send({ message: "User fetched successfully", user });
	} catch (error) {
		reply.status(500).send({ message: "Error fetching user", error });
	}
}

export async function updateUser(
	request: FastifyRequest<{ Body: UpdateUserInput }>,
	reply: FastifyReply
) {
	try {
		const userId = request.user.id;
		const data = request.body;
		const updatedUser = await UserService.updateUser(
			request.server,
			userId,
			data
		);
		reply.send({ message: "User updated successfully", updatedUser });
	} catch (error) {
		reply.status(500).send({ message: "Error updating user", error });
	}
}

export async function updateUserPassword(
	request: FastifyRequest<{ Body: ChangeUserPasswordInput }>,
	reply: FastifyReply
) {
	const { currentPassword, newPassword, newPassword2 } = request.body;
	if (newPassword !== newPassword2)
		return reply
			.status(400)
			.send({ message: "New passwords do not match." });
	if (currentPassword === newPassword)
		return reply
			.status(400)
			.send({ message: "New password is the same as old one." });
	try {
		const userId = request.user.id;
		const user = await UserService.getUserById(request.server, userId);
		if (!user) {
			return reply.status(404).send({ message: "User not found." });
		}

		const passwordMatch = await bcrypt.compare(
			currentPassword,
			user.password
		);
		if (!passwordMatch) {
			return reply
				.status(500)
				.send({ message: "Old password is incorrect." });
		}

		if (currentPassword === newPassword) {
			return reply.status(500).send({
				message: "New password cannot be the same as the old password.",
			});
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUser = await UserService.updateUserPassword(
			request.server,
			userId,
			hashedPassword
		);
		reply.send({ message: "Password updated successfully.", updatedUser });
	} catch (error) {
		reply.status(500).send({ message: "Error updating password", error });
	}
}

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
	try {
		const userId = request.user.id;
		await UserService.deleteUser(request.server, userId);
		reply.status(204).send({ message: "Account deleted" });
	} catch (error) {
		reply.status(500).send({ message: "Error deleting account", error });
	}
}
