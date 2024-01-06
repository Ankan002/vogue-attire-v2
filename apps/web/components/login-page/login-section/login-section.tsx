"use client";

import { MainLogo } from "brand-kit/logos";
import { SolidButton } from "ui/elements";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import MobileHeroImage from "@/assets/images/login/login-hero-mobile.png";

const LoginSection = () => {
	return (
		<div className="flex-1 flex flex-col min-h-screen px-5 py-5 font-geist-sans">
			<MainLogo />

			<div className="w-full flex-1 flex flex-col items-center justify-center">
				<Image
					src={MobileHeroImage.src}
					height={MobileHeroImage.height}
					width={MobileHeroImage.width}
					alt="Mobile Hero Image"
					className="w-full md:h-1/2 h-72 object-cover rounded-md border border-primary-dark dark:border-primary-light mt-5 lg:hidden"
				/>

				<div className="w-full flex flex-col md:max-w-[500px] lg:justify-center md:justify-start justify-center">
					<p className="md:text-3xl text-2xl text-primary-dark dark:text-primary-light font-medium md:text-justify text-center lg:mt-0 md:mt-10 mt-2">
						Welcome To The Fashion Capital 👋
					</p>

					<p className="text-dark-gray dark:text-secondary-gray text-lg font-base mt-6 text-justify">
						&quot;Elegance is an attitude. It's the way you carry
						yourself, the way you speak, and the way you embrace
						life.&quot;
					</p>
					<p className="text-dark-gray dark:text-secondary-gray text-lg font-base mt-1 text-end">
						- Carolina Herrera
					</p>

					<SolidButton
						title="Continue with Google"
						className="mt-10 font-geist-sans items-center transition-none"
						textClassName="text-lg tracking-wide"
						LeftIcon={FaGoogle}
						leftIconSize={20}
						leftIconClassName="mr-2 transition-none"
					/>
				</div>
			</div>
		</div>
	);
};

export default LoginSection;
