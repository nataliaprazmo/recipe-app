import z from "zod";

const FormSchema = z
	.object({
		id: z.string(),
		fullName: z.string().min(1, "Full name is required"),
		email: z.string().email("Please enter a valid email address"),
		password: z
			.string()
			.min(6, "Password must be at least 6 characters long"),
		passwordConfirm: z.string(),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match",
		path: ["passwordConfirm"],
	});

export const RegisterSchema = FormSchema.omit({ id: true });
export const LoginSchema = FormSchema.omit({
	id: true,
	fullName: true,
	passwordConfirm: true,
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
