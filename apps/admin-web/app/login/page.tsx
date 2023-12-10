import { LoginHero, LoginSection } from "@/components/login-page";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Vogue Attire Admin | Login",
};

const LoginPage = () => {
	return (
		<main className="w-full min-h-screen flex flex-col bg-primary-light dark:bg-primary-dark font-geist-sans">
			<div className="w-full min-h-screen flex">
				<LoginSection />
				<LoginHero />
			</div>
		</main>
	);
};

export default LoginPage;
