"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
	const [query, setQuery] = useState<string>("");
	const [debouncedQuery, setDebouncedQuery] = useState<string>("");

	const router = useRouter();

	const handleDebouncedChange = useDebouncedCallback((value: string) => {
		console.log(`Searching... ${value}`);
		setDebouncedQuery(value);
	}, 300);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
		handleDebouncedChange(value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const searchTerm = debouncedQuery.trim();
		if (!searchTerm) return;
		router.push(`/explore?searchTerm=${encodeURIComponent(searchTerm)}`);
	};

	return (
		<form
			className="flex flex-row w-3/4 md:w-1/2 xl:w-1/25 justify-between items-center border md:border-2 2xl:border-[3px] border-primary-500 rounded-full px-6 md:px-8 py-2 md:py-4 2xl:py-4 mb-40 shadow-s2"
			onSubmit={handleSubmit}
			role="search"
			aria-label="Recipe search form"
		>
			<input
				className="text-p5 md:text-p3 2xl:text-p2 font-medium text-grey-100 p-0 bg-transparent w-2/3 outline-none"
				type="search"
				id="search-bar"
				name="search-bar"
				placeholder="Search recipes"
				value={query}
				onChange={handleChange}
				aria-label="Search recipes"
				autoComplete="off"
				required
			/>
			<button
				className="h-fit w-fit"
				type="submit"
				disabled={!debouncedQuery.trim()}
				aria-label="Submit search"
			>
				<HiMiniMagnifyingGlass className="text-primary-500 text-base md:text-2xl 2xl:text-32" />
			</button>
		</form>
	);
}
