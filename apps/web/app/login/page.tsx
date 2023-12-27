import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Vogue Attire | Login",
};

const LoginPage = () => {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-primary-dark text-primary-dark dark:text-primary-light font-geist-sans text-xl">
			Login Page
		</main>
	);
};

export default LoginPage;
