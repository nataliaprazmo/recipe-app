"use client";

import { useState } from "react";
import Input from "../ui/input/input";

export default function SignupForm() {
	const [email, setEmail] = useState("");
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	return (
		<div className="flex flex-col w-full">
			<Input
				name="email"
				placeholder="Enter your email"
				value={email}
				type="email"
				changeValue={handleChange}
				size="md"
				variant="default"
				label="Email Address"
				required
			/>
		</div>
	);
}
