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
		content: UpdateCommentInput
	): Promise<Comment> {
		return this.prisma.comment.update({
			where: { id },
			data: content,
		});
	}

	async deleteComment(id: string): Promise<Comment> {
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
}
