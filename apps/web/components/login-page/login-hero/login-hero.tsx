"use client";

import LoginHeroImage from "@/assets/images/login/login-hero.png";
import Image from "next/image";

const LoginHero = () => {
	return (
		<div className="flex-1 lg:flex lg:flex-col lg:items-end hidden h-screen py-5 px-5">
			<Image
				src={LoginHeroImage.src}
				height={LoginHeroImage.height}
				width={LoginHeroImage.width}
				className="w-full h-full object-cover rounded-lg border border-primary-dark dark:border-primary-light"
				alt="login hero image"
			/>
		</div>
	);
};

export default LoginHero;
