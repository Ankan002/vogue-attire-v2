"use client";

import { useSidebar } from "./hook";
import { SidebarLogoutBtn } from "..";
import { sidebarLinks } from "@/constants/sidebar-links";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const Sidebar = () => {
	const { isMenuActive, currentPathname } = useSidebar();

	return (
		<div
			className={`${
				isMenuActive ? "lg:w-64 w-56 items-center" : "w-16"
			} flex flex-col  h-screen fixed top-0 left-0 z-20 px-2 pt-14 bg-secondary-light dark:bg-tertiary-dark/95 pb-3`}
		>
			<div className="flex-grow w-full px-2 overflow-y-auto pb-2">
				{sidebarLinks.map((link) => {
					const { Icon } = link;

					return (
						<Link
							href={link.route}
							className="w-full flex"
							key={link.id}
						>
							<div
								className={twMerge(
									`w-full flex items-end py-2 my-1.5 transition-none overflow-y-auto`,
									`${
										isMenuActive
											? "justify-start px-2 rounded-md hover:bg-primary-dark/5 dark:hover:bg-primary-light/10"
											: "justify-center hover:text-primary-dark/80 dark:hover:text-primary-light/80"
									}`,
									`${
										currentPathname === link.route
											? "text-primary-dark dark:text-primary-light hover:text-primary-dark hover:dark:text-primary-light"
											: "text-primary-dark/60 dark:text-primary-light/60"
									}`,
									`${
										isMenuActive &&
										currentPathname === link.route
											? "bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark hover:bg-primary-dark hover:dark:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark"
											: ""
									}`,
								)}
							>
								<Icon
									size={22}
									className={`transition-none ${
										isMenuActive ? "mr-2" : ""
									}`}
								/>

								{isMenuActive && (
									<p className="text-end">{link.name}</p>
								)}
							</div>
						</Link>
					);
				})}
			</div>

			{/* <button className="my-1"></button> */}
			<SidebarLogoutBtn className="mt-4" />
		</div>
	);
};

export default Sidebar;
