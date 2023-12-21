"use client";

import { useEffect } from "react";
import { useSidebar } from "./hook";

const Sidebar = () => {
	const { isMenuActive } = useSidebar();

	useEffect(() => {
		console.log(isMenuActive);
	}, [isMenuActive]);

	return (
		<div
			className={`${
				isMenuActive ? "lg:w-64 w-56" : "w-16"
			} flex flex-col  h-screen fixed top-0 left-0 z-20 px-1 pt-14 bg-secondary-light dark:bg-secondary-dark`}
		>
			<div className="flex-grow "></div>

			<button className="my-1"></button>
		</div>
	);
};

export default Sidebar;
