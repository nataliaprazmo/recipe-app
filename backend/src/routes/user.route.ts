import { FastifyInstance } from "fastify";
import * as UserController from "../controllers/user.controller";

export default async function userRoutes(fastify: FastifyInstance) {
	fastify.get("/all", UserController.getAllUsers); // TODO helper only
	fastify.get("/", UserController.getUserById);
	fastify.get("/email", UserController.getUserByEmail);
	fastify.post("/login", UserController.loginUser);
	fastify.post("/", UserController.createUser);
	fastify.put("/", UserController.updateUser);
	fastify.patch("/password", UserController.updateUserPassword);
	fastify.delete("/", UserController.deleteUser);
}
