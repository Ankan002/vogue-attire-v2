import Image from "next/image";
import LoginHeroImage from "@/assets/images/login/login-hero.jpeg";

const LoginHero = () => {
	return (
		<div className="flex-1 lg:flex lg:flex-col hidden h-screen py-5 px-5">
			<Image src={LoginHeroImage.src} height={LoginHeroImage.height} width={LoginHeroImage.width} alt="" className="w-full h-full object-cover rounded-lg" />
		</div>
	);
};

export default LoginHero;
