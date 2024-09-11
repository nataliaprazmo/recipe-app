"use client";

import { logoutUser } from "@/lib/actions/auth/logout";
import NavContainer from "../nav/nav-container";
import Button from "../ui/button";

export default function ExploreRecipes({ searchTerm }: { searchTerm: string }) {
	return (
		<>
			<NavContainer logoDark={false}>
				<form action={logoutUser}>
					<Button
						variant="filled"
						size="medium"
						color="secondary"
						text="Log out"
					/>
				</form>
			</NavContainer>
			<div className="px-6 sm:px-24 2xl:px-184 mt-24 lg:mt-32 xl:mt-36">
				<h2>Explore recipes</h2>
				<p>{searchTerm}</p>
			</div>
		</>
	);
}
