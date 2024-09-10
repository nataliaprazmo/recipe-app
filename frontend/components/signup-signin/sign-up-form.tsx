"use client";

import { useActionState } from "react";
import Input from "../ui/input/input";
import {
	HiOutlineEnvelope,
	HiOutlineLockClosed,
	HiOutlineUser,
} from "react-icons/hi2";
import { createUser } from "@/lib/actions/auth/signup";
import { SignUpState } from "@/lib/types/auth.types";
import Button from "../ui/button";

export default function SignupForm() {
	const initialState: SignUpState = {
		errors: {
			fullName: undefined,
			email: undefined,
			password: undefined,
			passwordConfirm: undefined,
			general: undefined,
		},
		message: undefined,
	};
	const [state, formAction] = useActionState(createUser, initialState);

	return (
		<form
			className="flex flex-col gap-2 sm:gap-3 w-full sm:w-3/4 xl:w-5/6 mb-12"
			action={formAction}
		>
			<Input
				name="fullName"
				placeholder="Enter your full name"
				type="text"
				size="md"
				variant="default"
				label="Full name"
				leftIcon={HiOutlineUser}
				errorMessages={state?.errors?.fullName}
				required
			/>
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
			<Input
				name="passwordConfirm"
				placeholder="Confirm your password"
				type="password"
				size="md"
				variant="default"
				label="Password confirmation"
				leftIcon={HiOutlineLockClosed}
				errorMessages={state?.errors?.passwordConfirm}
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
				text="Sign up"
				additionalclasses="w-fit mt-6 transition-all transition-300 ease-in-out"
			/>
		</form>
	);
}
