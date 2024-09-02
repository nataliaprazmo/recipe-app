import Button from "../ui/button";
import NavContainer from "../nav/nav-container";
import TwoColumnContent from "./two-column-content";
import Hero from "./hero";
import CategoriesSection from "./categories-section";
import { Suspense } from "react";
import CategoriesSkeleton from "../skeletons/categories.skeleton";

export default function HomePage() {
	return (
		<>
			<NavContainer>
				<Button
					variant="filled"
					color="primary"
					size="large"
					text="Get started"
				/>
			</NavContainer>{" "}
			<Hero />
			<TwoColumnContent
				id="content1"
				textLeft={true}
				title="Find, Add and Review Your Favourite Recipes"
				text="Dive into a vast collection of recipes from around the world. Whether you’re looking for a quick weeknight dinner or a gourmet meal, our search feature helps you find the perfect recipe. Easily add new recipes to your personal collection and keep track of all your culinary discoveries."
				buttonText="Discover recipes"
				buttonLink="/recipes"
				imageSrc="/images/content-1.webp"
				imageAlt="Content 1"
				imagePriority={true}
			/>
			<Suspense fallback={<CategoriesSkeleton />}>
				<CategoriesSection />
			</Suspense>
			<TwoColumnContent
				id="content2"
				textLeft={false}
				text="Become part of a vibrant community of food enthusiasts. Share your own culinary creations and explore recipes shared by others. Engage with other members through comments, tips, and reviews. By sharing your recipes, you contribute to a growing library of delicious options for everyone to enjoy."
				title="Join Our 10,000+ Recipe Sharing Community"
				buttonText="Join community"
				buttonLink="/signup"
				imageSrc="/images/content-2.webp"
				imageAlt="Content 2"
				imagePriority={true}
			/>
		</>
	);
}
