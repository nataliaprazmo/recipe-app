import { FastifyInstance } from "fastify";
import { createAuthController } from "../controllers/auth.controller";

export default async function authRoutes(fastify: FastifyInstance) {
	const authController = createAuthController();

	fastify.post("/", authController.login.bind(authController));
	fastify.get("/logout", authController.logout.bind(authController));
}
