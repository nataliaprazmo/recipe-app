"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logoutUser() {
	try {
		await fetch("http://localhost:5000/api/auth/logout", {
			method: "POST",
			credentials: "include",
		});
	} catch (error) {
		console.error("Error during logout:", error);
	}

	revalidatePath("/");
	redirect("/signin");
}
