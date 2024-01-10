"use client";

import { useAssetsPage } from "./hook";

const AssetsPage = () => {
	const { isMenuActive } = useAssetsPage();

	return (
		<div
			className={`flex min-h-screen flex-col bg-white dark:bg-primary-dark text-primary-dark dark:text-primary-light text-xl font-oxanium pt-12 ${
				isMenuActive ? "lg:ml-64 md:ml-56 ml-0" : "ml-16"
			}`}
		>
			<h1 className="px-5 py-2">
				ASSETS PAGE
			</h1>
		</div>
	);
};

export default AssetsPage;
