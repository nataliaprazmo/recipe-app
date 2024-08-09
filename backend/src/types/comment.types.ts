import { Comment } from "@prisma/client";

export type CreateCommentInput = Omit<Comment, "id">;

export type UpdateCommentInput = {
	content: string;
};
