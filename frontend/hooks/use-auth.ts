import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/services/auth.service";
import { ApiError } from "@/lib/api/api-error";

interface AuthErrors {
	emailError?: string;
	passwordError?: string;
	message?: string;
}

export const useAuth = () => {
	const router = useRouter();
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<AuthErrors>({
		emailError: undefined,
		passwordError: undefined,
		message: undefined,
	});
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			setFormValues((prev) => ({ ...prev, [name]: value }));
		},
		[]
	);

	const validateForm = () => {
		let isValid = true;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!formValues.email || !emailRegex.test(formValues.email)) {
			setErrors((prev) => ({
				...prev,
				emailError: "Invalid email address",
			}));
			isValid = false;
		}

		if (!formValues.password || formValues.password.length < 6) {
			setErrors((prev) => ({
				...prev,
				passwordError: "Password must be at least 6 characters long",
			}));
			isValid = false;
		}

		return isValid;
	};

	const handleSignin = async (): Promise<void> => {
		try {
			const response = await authService.login(formValues);
			router.push("/user");
		} catch (error) {
			if (error instanceof ApiError) {
				if (error.status === 409) {
					const { message: errorMessage } = error.data || {
						message: error.message,
					};
					const errorField = errorMessage.includes("email")
						? "emailError"
						: "passwordError";
					setErrors((prev) => ({
						...prev,
						[errorField]: errorMessage,
					}));
				} else {
					setErrors((prev) => ({
						...prev,
						message:
							error.data?.message ||
							error.message ||
							"Login failed",
					}));
				}
			} else {
				console.error("Login error:", error);
				throw error;
			}
		}
	};

	const signin = async (signinCallback?: () => Promise<void>) => {
		if (!validateForm()) return;

		setIsLoading(true);
		setErrors({
			emailError: undefined,
			passwordError: undefined,
			message: undefined,
		});

		try {
			if (signinCallback) {
				await signinCallback();
			} else {
				await handleSignin();
			}
		} catch (error) {
			setErrors((prev) => ({
				...prev,
				message: "An error occurred. Please try again.",
			}));
		} finally {
			setIsLoading(false);
		}
	};

	return {
		formValues,
		errors,
		setErrors,
		isLoading,
		handleInputChange,
		signin,
		handleSignin,
	};
};
