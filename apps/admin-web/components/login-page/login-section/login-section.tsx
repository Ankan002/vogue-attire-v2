import { BrandLogo } from "@/components/common";
import Image from "next/image";
import LoginHeroMobile from "@/assets/images/login/login-hero-mobile.jpeg";

const LoginSection = () => {
	return (
		<div className="flex-1 flex flex-col min-h-screen px-5 py-5">
			<BrandLogo />

			<div className="w-full h-full items-center lg:justify-center justify-start mt-4 flex flex-col font-geist-sans">
				<Image
					src={LoginHeroMobile.src}
					width={LoginHeroMobile.width}
					height={LoginHeroMobile.height}
					alt="Login Hero Mobile"
					className="w-full md:max-w-[550px] max-w-[500px] md:h-40 h-32 object-cover rounded-md lg:hidden"
				/>

				<div className="w-full max-w-[450px] flex flex-col mt-4">
					<p className="text-primary-dark dark:text-primary-light text-3xl font-medium">
						Welcome Back 👋
					</p>
					<p className="text-dark-gray dark:text-secondary-gray text-lg font-base mt-3">
						You will never lose if you never give up. Let's sign in
						to change the industry.
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginSection;
