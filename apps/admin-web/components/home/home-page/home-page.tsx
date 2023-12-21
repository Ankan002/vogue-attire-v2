"use client";

import { useHomePage } from "./hook";

const HomePage = () => {
    const { isMenuActive } = useHomePage();

	return (
		<div className={`flex min-h-screen flex-col bg-white dark:bg-primary-dark text-primary-dark dark:text-primary-light text-xl font-oxanium mt-12 ${isMenuActive ? "lg:ml-64 md:ml-56 ml-0" : "ml-0"}`}>
			DEFAULT PAGE
		</div>
	);
};

export default HomePage;
