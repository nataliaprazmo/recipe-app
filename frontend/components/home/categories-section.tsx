import { Category } from "@/lib/types/data.types";
import CategoriesCards from "./categories-cards";
import { fetchCategories } from "@/lib/data";

export default async function CategoriesSection() {
	const categories: Category[] = await fetchCategories();
	return (
		<section className="my-16">
			<h3 className="text-p2 font-lato sm:text-h4 xl:text-h3 font-bold mb-4 sm:mb-6 md:mb-8 xl:mb-10 text-center mx-auto">
				Explore popular categories
			</h3>
			<CategoriesCards categories={categories} />
		</section>
	);
}
