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
				isMenuActive ? "flex" : "hidden"
			} flex-col lg:w-64 w-56 h-screen fixed top-0 left-0 bg-primary-orange z-20`}
		></div>
	);
};

export default Sidebar;
