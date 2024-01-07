"use client";

import { SidebarLink } from "@/types/common";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
	link: SidebarLink;
	isMenuActive: boolean;
	isSelected: boolean;
}

const SidebarBtn = (props: Props) => {
	const { link, isMenuActive, isSelected } = props;
	const { Icon, name, route } = link;

	return (
		<Link href={route} className="w-full flex">
			<div
				className={twMerge(
					`w-full flex items-end py-2 my-1.5 transition-none`,
					`${
						isMenuActive
							? "justify-start px-2 rounded-md hover:bg-primary-dark/5 dark:hover:bg-primary-light/10"
							: "justify-center hover:text-primary-dark/80 dark:hover:text-primary-light/80"
					}`,
					`${
						isSelected
							? "text-primary-dark dark:text-primary-light hover:text-primary-dark hover:dark:text-primary-light"
							: "text-primary-dark/60 dark:text-primary-light/60"
					}`,
					`${
						isMenuActive && isSelected
							? "bg-primary-dark dark:bg-primary-light text-primary-light dark:text-primary-dark hover:bg-primary-dark hover:dark:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark"
							: ""
					}`,
				)}
			>
				<Icon
					size={22}
					className={`transition-none ${isMenuActive ? "mr-2" : ""}`}
				/>

				{isMenuActive && <p className="text-end">{name}</p>}
			</div>
		</Link>
	);
};

export default SidebarBtn;
