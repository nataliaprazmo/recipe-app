import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type LogoProps = {
	dark?: boolean;
};

function Logo({ dark }: LogoProps) {
	const logoSrc = dark ? "/images/logo-dark.svg" : "/images/logo-light.svg";

	return (
		<Link href="/">
			<Image
				src={logoSrc}
				width={80}
				height={42}
				style={{
					objectFit: "contain",
				}}
				alt="Logo"
				loading="lazy"
				className="w-20 h-[42px] md:w-24 md:h-[50px] 3xl:w-[137px] 3xl:h-18 "
			/>
		</Link>
	);
}

export default memo(Logo);
