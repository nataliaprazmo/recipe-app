import ExploreRecipes from "@/components/explore/explore-recipes";

export default async function ExplorePage({
	searchParams,
}: {
	searchParams: Promise<{ searchTerm?: string }>;
}) {
	const params = await searchParams;
	const searchTerm = params.searchTerm ?? "";

	return (
		<main className="overflow-x-hidden">
			<ExploreRecipes searchTerm={searchTerm} />
		</main>
	);
}
