import { fetchRecipe } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function RecipePage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const id = params.id;
	const recipe = await fetchRecipe(id);

	if (!recipe) {
		notFound();
	}

	return (
		<>
			<h1>{recipe.name}</h1>
		</>
	);
}
