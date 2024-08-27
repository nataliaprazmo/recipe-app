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
				className="w-20 h-[42px] xs:w-24 xs:h-[50px] sm:w-[137px] sm:h-18 xl:w-[152px] xl:h-20"
			/>
		</Link>
	);
}

export default memo(Logo);
