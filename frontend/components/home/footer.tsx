import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";
import { AiFillTikTok } from "react-icons/ai";
import Image from "next/image";
import Logo from "../ui/logo";
import Button from "../ui/button";
import FooterLinks from "./footer-links";

export default function Footer() {
	const navLinks = [
		{
			text: "Home",
			link: "/",
		},
		{ text: "Help & FAQ", link: "/" },
		{ text: "Sign In", link: "/signin" },
	];
	const contactInfo = ["contact@foodi.com", "+12 345 678 901"];
	const iconClasses = "w-4 sm:w-6 h-4 sm:h-6 text-grey-200";
	const icons = [
		<AiFillInstagram className={iconClasses} />,
		<BsPinterest className={iconClasses} />,
		<BsFacebook className={iconClasses} />,
		<AiFillTikTok className={iconClasses} />,
	];
	return (
		<footer className="px-6 sm:px-24 2xl:px-184 py-16 sm:py-24 bg-grey-800 flex flex-col">
			<Logo dark={true} />
			<div className="flex flex-row items-start justify-start lg:justify-between h-fit w-full">
				<div className="flex flex-col sm:flex-row 2xl:flex-col w-full 2xl:w-7/12 justify-between items-start sm:items-center lg:items-start mt-6 sm:mt-12 2xl:mt-16">
					<div className="h-fit w-8/12 lg:w-full 2xl:w-3/4 flex-col items-start justify-start mb-0 2xl:mb-36 hidden sm:flex">
						<h3 className="text-xl sm:text-h4 lg:text-h3 text-grey-100 mb-2 sm:mb-3">
							Become a recipe insider
						</h3>
						<p className="text-p4 lg:text-p3 text-grey-200 mb-6 sm:mb-8">
							Unlock a world of delicious recipes and connect with
							fellow food enthusiasts. By signing in, you gain
							access to personalized recipe suggestions, exclusive
							content, and the ability to save and share your
							favorite dishes. Don't miss out on the full
							experience – join our vibrant community today!
						</p>
						<Button
							variant="filled"
							color="primary"
							size="medium"
							text="Sign up"
							link="/signup"
							additionalclasses="sm:text-p2 sm:px-12 sm:py-4 sm:gap-4"
						/>
					</div>
					<div className="w-full sm:w-fit 2xl:w-full ml-0 lg:ml-8 2xl:ml-0 flex flex-col xs:flex-row sm:flex-col lg:flex-row justify-between gap-4 mt-6 sm:mt-0">
						<FooterLinks title="Navigation" links={navLinks} />
						<FooterLinks title="Get in touch" texts={contactInfo} />
						<FooterLinks title="Socials" icons={icons} />
					</div>
				</div>
				<Image
					className="w-4/12 h-[575px] rounded-4xl shadow-e2 mt-16 hidden 2xl:block"
					src="/images/footer-photo.webp"
					width={500}
					height={575}
					style={{
						objectFit: "cover",
					}}
					alt="Logo"
					loading="lazy"
				/>
			</div>
		</footer>
	);
}
