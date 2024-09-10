"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RegisterSchema } from "@/lib/schemas/auth.schema";
import { SignUpState } from "@/lib/types/auth.types";

export async function createUser(
	prevState: SignUpState,
	formData: FormData
): Promise<SignUpState> {
	const validatedFields = RegisterSchema.safeParse({
		fullName: formData.get("fullName"),
		email: formData.get("email"),
		password: formData.get("password"),
		passwordConfirm: formData.get("passwordConfirm"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Please fix the errors below.",
		};
	}

	const { fullName, email, password, passwordConfirm } = validatedFields.data;

	if (password !== passwordConfirm) {
		const passwordError = "Passwords don't match";
		const errors = {
			password: [passwordError],
			passwordConfirm: [passwordError],
		};
		return {
			errors: errors,
			message: "Password confirmation failed.",
		};
	}

	try {
		const response = await fetch("http://localhost:5000/api/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: fullName,
				email: email,
				password: password,
			}),
		});

		const responseData = await response.json();

		if (!response.ok) {
			if (response.status === 401) {
				return {
					errors: {
						email: ["An account with this email already exists"],
					},
					message: "Registration failed.",
				};
			}

			if (response.status === 500) {
				return {
					errors: {
						general: [
							"Server error occurred. Please try again later.",
						],
					},
					message: "Registration failed.",
				};
			}

			return {
				errors: {
					general: [
						responseData.error || "An unexpected error occurred",
					],
				},
				message: "Registration failed.",
			};
		}

		console.log("User created successfully:", responseData);
	} catch (error) {
		console.error("Network error during registration:", error);
		return {
			errors: {
				general: [
					"Network error. Please check your connection and try again.",
				],
			},
			message: "Registration failed.",
		};
	}

	revalidatePath("/signin");
	redirect("/signin");
}
