import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Vogue Attire Admin | Login",
};

const LoginPage = () => {
	return (
		<main className="w-full min-h-screen flex items-center justify-center bg-primary-light dark:bg-primary-dark">
			<h1 className="text-xl font-geist-sans text-primary-dark dark:text-primary-light">
				Login Page
			</h1>
		</main>
	);
};

export default LoginPage;
