import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/user.controller";
import { User } from "@prisma/client";
import {
	ChangeUserPasswordInput,
	CreateUserInput,
	UpdateUserInput,
} from "../types/user.types";
import { BasicRecipe } from "../types/recipe.types";
import { userRecipeRoutes } from "./recipe.route";
import { userCommentRoutes } from "./comment.route";
import { userFavouriteRoutes } from "./favourite.route";
import { userRatingRoutes } from "./rating.route";

export default async function userRoutes(fastify: FastifyInstance) {
	const userController = createUserController(fastify.prisma);

	// TODO helper only
	fastify.get<{
		Reply: { message: string; users: User[] } | { error: string };
	}>("/all", userController.getAllUsers.bind(userController));

	fastify.get<{
		Reply: { message: string; user: User } | { error: string };
	}>(
		"/",
		{ preHandler: [fastify.auth] },
		userController.getUserById.bind(userController)
	);

	fastify.get<{
		Reply: { message: string; user: User } | { error: string };
	}>(
		"/email",
		{ preHandler: [fastify.auth] },
		userController.getUserByEmail.bind(userController)
	);

	fastify.post<{
		Body: CreateUserInput;
		Reply: { message: string; newUser: User } | { error: string };
	}>("/", userController.createUser.bind(userController));

	fastify.put<{
		Body: UpdateUserInput;
		Reply: { message: string; updatedUser: User } | { error: string };
	}>(
		"/",
		{ preHandler: [fastify.auth] },
		userController.updateUser.bind(userController)
	);

	fastify.patch<{
		Body: ChangeUserPasswordInput;
		Reply: { message: string; updatedUser: User } | { error: string };
	}>(
		"/password",
		{ preHandler: [fastify.auth] },
		userController.updateUserPassword.bind(userController)
	);

	fastify.delete<{
		Reply: { message: string } | { error: string };
	}>(
		"/",
		{ preHandler: [fastify.auth] },
		userController.deleteUser.bind(userController)
	);

	// recipes
	fastify.register(userRecipeRoutes, { prefix: "/recipes" });

	// comments
	fastify.register(userCommentRoutes, { prefix: "/comments" });

	// favourites
	fastify.register(userFavouriteRoutes, { prefix: "/favourites" });

	// ratings
	fastify.register(userRatingRoutes, { prefix: "/ratings" });
}
