import { FastifyInstance } from "fastify";
import { AuthResult, LoginCredentials } from "../types/auth.types";
import { UserService } from "./user/user.service";
const bcrypt = require("bcrypt");

export class AuthService {
	async authenticateUser(
		fastify: FastifyInstance,
		credentials: LoginCredentials
	): Promise<AuthResult> {
		try {
			const { email, password } = credentials;
			const userService = new UserService(fastify.prisma);

			const user = await userService.getUserByEmail(email);
			if (!user) {
				return {
					success: false,
					error: "Invalid email",
				};
			}

			const isPasswordValid = await bcrypt.compare(
				password,
				user.password
			);
			if (!isPasswordValid) {
				return {
					success: false,
					error: "Invalid password",
				};
			}

			const token = fastify.jwt.sign({
				id: user.id,
				email: user.email,
			});

			return {
				success: true,
				user: {
					id: user.id,
					email: user.email,
				},
				token,
			};
		} catch (error) {
			return {
				success: false,
				error: "Authentication failed",
			};
		}
	}

	async validateToken(
		fastify: FastifyInstance,
		token: string
	): Promise<boolean> {
		try {
			await fastify.jwt.verify(token);
			return true;
		} catch {
			return false;
		}
	}

	generateCookieOptions(nodeEnv?: string) {
		return {
			httpOnly: true,
			secure: nodeEnv === "production",
			sameSite: "strict" as const,
			path: "/",
			maxAge: 60 * 60,
		};
	}
}
