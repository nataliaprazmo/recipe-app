"use client";

import { SignInState } from "@/lib/types/auth.types";
import Button from "../ui/button";
import Input from "../ui/input/input";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { loginUser } from "@/lib/actions/auth/signin";
import { useActionState } from "react";

export default function SigninForm() {
	const initialState: SignInState = {
		errors: {
			email: undefined,
			password: undefined,
			general: undefined,
		},
		message: undefined,
	};
	const [state, formAction] = useActionState(loginUser, initialState);
	return (
		<form
			action={formAction}
			className="flex flex-col gap-2 sm:gap-3 w-full sm:w-3/4 xl:w-5/6 mb-12"
		>
			<Input
				name="email"
				placeholder="Enter your email"
				type="email"
				size="md"
				variant="default"
				label="Email address"
				leftIcon={HiOutlineEnvelope}
				errorMessages={state?.errors?.email}
				required
			/>
			<Input
				name="password"
				placeholder="Enter password"
				type="password"
				size="md"
				variant="default"
				label="Password"
				leftIcon={HiOutlineLockClosed}
				errorMessages={state?.errors?.password}
				required
			/>
			{state?.errors?.general && (
				<div className="flex flex-col gap-2 mt-2">
					{state.errors.general.map((generalError, index) => (
						<p
							key={index}
							className="text-red-600 font-semibold text-p4"
						>
							{generalError}
						</p>
					))}
				</div>
			)}

			{state?.message && (
				<div className="text-red-600 text-p4 font-semibold mt-2">
					{state.message}
				</div>
			)}
			<Button
				type="submit"
				variant="filled"
				color="primary"
				size="medium"
				text="Sign in"
				additionalclasses="w-fit mt-6 transition-all transition-300 ease-in-out"
			/>
		</form>
	);
}
