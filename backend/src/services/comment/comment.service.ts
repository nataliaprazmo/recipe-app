import { Comment, PrismaClient } from "@prisma/client";
import {
	CreateCommentInput,
	UpdateCommentInput,
} from "../../types/comment.types";

export class CommentService {
	constructor(private prisma: PrismaClient) {}

	async createComment(data: CreateCommentInput): Promise<Comment> {
		return this.prisma.comment.create({ data });
	}

	async updateComment(
		id: string,
		userId: string,
		content: UpdateCommentInput
	): Promise<Comment> {
		const existingComment = await this.getCommentById(id);

		if (existingComment?.ownerId !== userId) {
			throw Error("You do not have permission to update this comment");
		}
		return this.prisma.comment.update({
			where: { id },
			data: content,
		});
	}

	async deleteComment(id: string, userId: string): Promise<Comment> {
		const existingComment = await this.getCommentById(id);

		if (existingComment?.ownerId !== userId) {
			throw Error("You do not have permission to delete this comment");
		}

		return this.prisma.comment.delete({
			where: { id },
		});
	}

	async getCommentsByRecipe(recipeId: string): Promise<Comment[] | null> {
		return this.prisma.comment.findMany({
			where: { recipeId },
		});
	}

	async getCommentsByUser(ownerId: string): Promise<Comment[] | null> {
		return this.prisma.comment.findMany({
			where: { ownerId },
		});
	}

	async getCommentById(id: string): Promise<Comment | null> {
		return this.prisma.comment.findUnique({
			where: { id },
		});
	}
}
