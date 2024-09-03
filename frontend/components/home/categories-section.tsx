import { Category } from "@/lib/types/data.types";
import CategoriesCards from "./categories-cards";
import { fetchCategories } from "@/lib/data";

export default async function CategoriesSection() {
	const categories: Category[] = await fetchCategories();
	return (
		<section className="my-16">
			<h3 className="text-h3 font-bold mb-10 text-center">
				Explore popular categories
			</h3>
			<CategoriesCards categories={categories} />
		</section>
	);
}
