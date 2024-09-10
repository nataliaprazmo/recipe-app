import Image from "next/image";
import Link from "next/link";

interface SignUpContainerProps {
	page: "signup" | "signin";
	title: string;
	text: string;
	children: React.ReactNode;
}

export default function SignupContainer({
	page,
	title,
	text,
	children,
}: SignUpContainerProps) {
	const imageSrc = `/images/${page}.webp`;
	return (
		<div className="grid grid-cols-4 sm:grid-cols-8 xl:grid-cols-12 gap-4 xl:gap-6 px-6 sm:px-24 2xl:px-184 mt-24 lg:mt-32 xl:mt-36">
			<div className="flex flex-col items-start justify-between h-full col-span-full lg:col-span-4 xl:col-span-6">
				<h3 className="text-h4 sm:text-h3 text-grey-800 mb-2 md:mb-3 xl:mb-4 font-bold">
					{title}
				</h3>
				<p className="hidden xxs:block text-p5 sm:text-p3 xl:text-p2 text-grey-700 mb-4 sm:mb-6 xl:mb-12 font-medium w-full sm:w-3/4 lg:w-full">
					{text}
				</p>
				{children}
				<div className="mt-8 sm:mt-12 xl:mt-auto flex flex-row justify-start items-center mb-8">
					<p className="text-grey-800 text-p5 sm:text-p4 xl:text-p3 mr-4">
						{page === "signin"
							? "Don't have an account?"
							: "Have an account?"}
					</p>
					<Link
						href={page === "signin" ? "/signup" : "/signin"}
						className="font-bold underline text-grey-800 text-p5 sm:text-p4 xl:text-p3"
					>
						{page === "signin" ? "Register here" : "Login here"}
					</Link>
				</div>
			</div>
			<Image
				src={imageSrc}
				width={630}
				height={700}
				style={{
					objectFit: "cover",
				}}
				alt={page}
				loading="lazy"
				className="hidden lg:inline-block sm:col-span-6 lg:col-start-6 lg:col-span-3 xl:col-start-8 xl:col-span-5 rounded-3xl lg:rounded-4xl h-48 lg:h-full shadow-s2 mt-8 lg:mt-0"
			/>
		</div>
	);
}
