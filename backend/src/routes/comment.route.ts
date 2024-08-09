import { FastifyInstance } from "fastify";
import { createCommentController } from "../controllers/comment.controller";
import { CreateCommentInput } from "../types/comment.types";
import { Comment } from "@prisma/client";

export async function userCommentRoutes(fastify: FastifyInstance) {
	const commentController = createCommentController(fastify.prisma);

	fastify.post<{
		Body: Omit<CreateCommentInput, "ownerId">;
		Reply: Comment;
	}>(
		"/",
		{ preHandler: [fastify.auth] },
		commentController.createComment.bind(commentController)
	);

	fastify.get<{
		Reply: Comment | { error: string };
	}>(
		"/",
		{ preHandler: [fastify.auth] },
		commentController.getCommentsByUser.bind(commentController)
	);

	fastify.put<{
		Params: { id: string };
		Body: { content: string };
		Reply: Comment | { error: string };
	}>(
		"/:id",
		{ preHandler: [fastify.auth] },
		commentController.updateComment.bind(commentController)
	);

	fastify.delete<{
		Params: { id: string };
		Reply: { message: string } | { error: string };
	}>(
		"/:id",
		{ preHandler: [fastify.auth] },
		commentController.deleteComment.bind(commentController)
	);
}

export async function recipeCommentRoutes(fastify: FastifyInstance) {
	const commentController = createCommentController(fastify.prisma);

	fastify.get<{
		Params: { recipeId: string };
		Reply: Comment[];
	}>(
		"/:recipeId",
		{ preHandler: [fastify.auth] },
		commentController.getCommentsByRecipe.bind(commentController)
	);
}
