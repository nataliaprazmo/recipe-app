"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Category } from "@/lib/types/data.types";

export default function CategoriesCards({
	categories,
}: {
	categories: Category[];
}) {
	return (
		<Swiper
			centeredSlides={true}
			loop={true}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}
			breakpoints={{
				640: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				960: {
					slidesPerView: 3,
					spaceBetween: 16,
				},
				1280: {
					slidesPerView: 4,
					spaceBetween: 16,
				},
				1600: {
					slidesPerView: 6,
					spaceBetween: 32,
				},
			}}
			modules={[Autoplay]}
			className="select-none"
		>
			{categories.map((category, index) => (
				<SwiperSlide
					key={index}
					className="relative w-full h-full cursor-pointer"
				>
					<div className="bg-black bg-opacity-70 w-full h-full absolute top-0 left-0 rounded-3xl z-10" />
					<Image
						alt={`${category.name} category`}
						src={`/images/${category.name
							.replace(/\s+/g, "")
							.toLowerCase()}.webp`}
						height={160}
						width={320}
						style={{
							objectFit: "cover",
						}}
						loading="lazy"
						className="w-full h-40 rounded-3xl shadow-s1"
					/>
					<p className="text-p4 sm:text-p3 2xl:text-p1 font-bold z-20 absolute inset-0 flex items-center justify-center text-grey-100">
						{category.name}
					</p>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
