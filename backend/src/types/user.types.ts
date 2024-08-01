import { User } from "@prisma/client";

export type CreateUserInput = Omit<User, "id">;

export type UpdateUserInput = Partial<Omit<User, "id">>;

export type LoginInput = Pick<User, "email" | "password">;

export type ChangeUserPasswordInput = {
	currentPassword: string;
	newPassword: string;
	newPassword2: string;
};
