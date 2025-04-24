import { HiChevronDown } from "react-icons/hi2";
import Button from "../ui/button";
import SearchBar from "../ui/search-bar";

export default function Hero() {
	return (
		<section className="bg-hero bg-cover bg-center h-fit w-full">
			<div className="bg-black bg-opacity-75 h-fit pt-24 pb-12 flex flex-col gap-24 justify-start w-full">
				<div className="flex flex-col px-6 sm:px-24 2xl:px-184 items-center justify-center mt-24">
					<h1 className="text-grey-100 font-bold text-center mb-4 md:mb-5 xl:mb-6 text-h3 md:text-h2 3xl:text-h1 mx-auto">
						Browse, store, and share your favorite recipes with ease
					</h1>
					<p className="uppercase text-grey-200 mb-8 md:mb-9 xl:mb-10 3xl:mb-12 text-center text-p5 md:text-p3 3xl:text-p2">
						Your Culinary Journey Starts Here!
					</p>
					<div className="w-full flex justify-center mb-16 md:mb-18 xl:mb-24 3xl:mb-40">
						<SearchBar />
					</div>
					<div className="flex justify-center">
						<Button
							variant="text"
							color="dark"
							size="small"
							link="#content1"
							icon={
								<HiChevronDown
									className="text-sm lg:text-p4 2xl:text-p3 text-grey-200 stroke-1 lg:stroke-2"
									aria-label="Scroll down"
								/>
							}
							text="Discover More"
							additionalclasses="text-p5 sm:text-p4 lg:text-p3 3xl:text-p2 font-medium gap-4"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
