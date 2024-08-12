import { HiChevronDown } from "react-icons/hi2";
import Button from "../Button";
import SearchBar from "../SearchBar";

export default function Hero() {
	return (
		<section className="bg-hero bg-cover bg-center h-fit w-full">
			<div className="bg-black bg-opacity-75 h-fit pt-24 flex-col gap-24 justify-start w-full">
				<div className="flex-col px-6 sm:px-24 2xl:px-184 items-center justify-center mt-24">
					<h1 className="text-grey-100 font-bold text-center mb-8 text-h3 md:text-h2 xl:text-h1">
						Browse, store, and share your favorite recipes with ease
					</h1>
					<p className="uppercase text-grey-200 mb-12 text-center text-p5 md:text-p3 2xl:text-p2">
						Your Culinary Journey Starts Here!
					</p>
					<div className="w-full flex justify-center">
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
							additionalclasses="text-p5 sm:text-p4 lg:text-p3 2xl:text-p2 font-medium gap-4 pb-16"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
