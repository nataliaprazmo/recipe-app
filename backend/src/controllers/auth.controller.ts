import { FastifyRequest, FastifyReply } from "fastify";
import { LoginInput } from "../types/user.types";
import { AuthService } from "../services/auth.service";

class AuthController {
	constructor(private authService: AuthService) {}

	async login(
		request: FastifyRequest<{ Body: LoginInput }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const authResult = await this.authService.authenticateUser(
				request.server,
				request.body
			);

			if (!authResult.success) {
				await reply.code(409).send({ error: authResult.error });
				return;
			}

			const cookieOptions = this.authService.generateCookieOptions(
				process.env.NODE_ENV
			);

			await reply
				.setCookie("token", authResult.token!, cookieOptions)
				.code(200)
				.send({
					message: "Login successful",
					user: authResult.user,
				});
		} catch (error) {
			request.log.error("Error logging user in:", error);
			await reply.code(500).send({ error: "Failed to log user in" });
		}
	}

	async logout(request: FastifyRequest, reply: FastifyReply): Promise<void> {
		try {
			const cookieOptions = this.authService.generateCookieOptions(
				process.env.NODE_ENV
			);

			await reply
				.clearCookie("token", cookieOptions)
				.send({ message: "Logout successful" });
		} catch (error) {
			request.log.error("Error logging out:", error);
			await reply.code(500).send({ error: "Failed to log out" });
		}
	}
}

export const createAuthController = (): AuthController => {
	const authService = new AuthService();
	return new AuthController(authService);
};
