import { FastifyReply, FastifyRequest } from "fastify";
import { CommentService } from "../services/comment/comment.service";
import { CreateCommentInput } from "../types/comment.types";
import { PrismaClient } from "@prisma/client";

class CommentController {
	constructor(private commentService: CommentService) {}

	async createComment(
		request: FastifyRequest<{ Body: Omit<CreateCommentInput, "ownerId"> }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const newComment = await this.commentService.createComment({
				ownerId: request.user.id,
				...request.body,
			});
			await reply
				.status(201)
				.send({ message: "Comment created", newComment });
		} catch (error) {
			request.log.error("Error creating comment", error);
			await reply.status(400).send({ error: "Error creating comment" });
		}
	}

	async updateComment(
		request: FastifyRequest<{
			Params: { id: string };
			Body: { content: string };
		}>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const userId = request.user.id;
			const commentId = request.params.id;

			const updatedComment = await this.commentService.updateComment(
				commentId,
				userId,
				request.body
			);
			await reply.send({ message: "Comment updated", updatedComment });
		} catch (error) {
			request.log.error("Error updating comment", error);
			await reply.status(400).send({ error: "Error updating comment" });
		}
	}

	async deleteComment(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const userId = request.user.id;
			const commentId = request.params.id;

			await this.commentService.deleteComment(commentId, userId);
			await reply.status(204).send({ message: "Comment deleted" });
		} catch (error) {
			request.log.error("Error deleting comment", error);
			await reply.status(400).send({ error: "Error deleting comment" });
		}
	}

	async getCommentsByRecipe(
		request: FastifyRequest<{ Params: { recipeId: string } }>,
		reply: FastifyReply
	): Promise<void> {
		try {
			const recipeId = request.params.recipeId;
			const comments = await this.commentService.getCommentsByRecipe(
				recipeId
			);
			await reply
				.status(200)
				.send({ message: "Recipe comments fetched", comments });
		} catch (error) {
			request.log.error("Error fetching comments for recipe", error);
			await reply.status(400).send({
				error: "Error fetching comments for recipe",
			});
		}
	}

	async getCommentsByUser(
		request: FastifyRequest,
		reply: FastifyReply
	): Promise<void> {
		try {
			const ownerId = request.user.id;
			const comments = await this.commentService.getCommentsByUser(
				ownerId
			);
			await reply
				.status(200)
				.send({ message: "Users comments fetched", comments });
		} catch (error) {
			request.log.error("Error fetching comments for user", error);
			await reply.status(400).send({
				error: "Error fetching comments for user",
			});
		}
	}
}

export const createCommentController = (
	prisma: PrismaClient
): CommentController => {
	const commentService = new CommentService(prisma);
	return new CommentController(commentService);
};
