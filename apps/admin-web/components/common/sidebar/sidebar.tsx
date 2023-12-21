"use client";

import { useEffect } from "react";
import { useSidebar } from "./hook";
import { SidebarLogoutBtn } from "..";

const Sidebar = () => {
	const { isMenuActive } = useSidebar();

	useEffect(() => {
		console.log(isMenuActive);
	}, [isMenuActive]);

	return (
		<div
			className={`${
				isMenuActive ? "lg:w-64 w-56 items-center" : "w-16"
			} flex flex-col  h-screen fixed top-0 left-0 z-20 px-2 pt-14 bg-secondary-light dark:bg-tertiary-dark/95 pb-3`}
		>
			<div className="flex-grow "></div>

			{/* <button className="my-1"></button> */}
			<SidebarLogoutBtn />
		</div>
	);
};

export default Sidebar;
