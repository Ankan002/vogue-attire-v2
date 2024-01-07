"use client";

import { useSidebar } from "./hook";
import { SidebarLogoutBtn } from "..";
import { sidebarLinks } from "@/constants/sidebar-links";
import { SidebarBtn } from "@/components/elements";

const Sidebar = () => {
	const { isMenuActive, currentPathname } = useSidebar();

	return (
		<div
			className={`${
				isMenuActive ? "lg:w-64 w-56 items-center" : "w-16"
			} flex flex-col  h-screen fixed top-0 left-0 z-20 px-2 pt-14 bg-secondary-light dark:bg-tertiary-dark/95 pb-3`}
		>
			<div className="flex-grow w-full px-2 overflow-y-auto pb-2">
				{sidebarLinks.map((link) => (
					<SidebarBtn
						key={link.id}
						isMenuActive={isMenuActive}
						isSelected={link.route === currentPathname}
						link={link}
					/>
				))}
			</div>

			{/* <button className="my-1"></button> */}
			<SidebarLogoutBtn className="mt-4" />
		</div>
	);
};

export default Sidebar;
