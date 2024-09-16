"use server";

import { LoginSchema } from "@/lib/schemas/auth.schema";
import { SignInState } from "@/lib/types/auth.types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginUser(
	prevState: SignInState,
	formData: FormData
): Promise<SignInState> {
	const validatedFields = LoginSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Please fix the errors below.",
		};
	}

	const { email, password } = validatedFields.data;

	try {
		const response = await fetch("http://localhost:5000/api/auth", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});

		const responseData = await response.json();

		if (!response.ok) {
			if (response.status === 401) {
				return {
					errors: {
						general: ["Invalid email or password"],
					},
					message: "Login failed.",
				};
			}

			if (response.status === 404) {
				return {
					errors: {
						email: ["No account found with this email"],
					},
					message: "Login failed.",
				};
			}

			if (response.status === 500) {
				return {
					errors: {
						general: [
							"Server error occurred. Please try again later.",
						],
					},
					message: "Login failed.",
				};
			}

			return {
				errors: {
					general: [
						responseData.error || "An unexpected error occurred",
					],
				},
				message: "Login failed.",
			};
		}

		console.log("User logged in successfully:", responseData);
	} catch (error) {
		console.error("Network error during login:", error);
		return {
			errors: {
				general: [
					"Network error. Please check your connection and try again.",
				],
			},
			message: "Login failed.",
		};
	}

	revalidatePath("/explore");
	redirect("/explore");
}
