"use client";

import { Power } from "lucide-react";
import { useSidebarLogoutBtn } from "./hook";

const SidebarLogoutBtn = () => {
	const { isMenuActive, onLogoutClick } = useSidebarLogoutBtn();

	return (
		<button
			className="w-full flex items-center justify-center  bg-primary-red/20 text-primary-red py-2 rounded-lg"
			aria-label="logout"
			onClick={onLogoutClick}
		>
			<Power size={22} />

			{isMenuActive && (
				<p className="font-geist-sans text-lg ml-1.5">Logout</p>
			)}
		</button>
	);
};

export default SidebarLogoutBtn;
