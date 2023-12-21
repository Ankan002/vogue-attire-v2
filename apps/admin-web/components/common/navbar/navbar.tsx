"use client";

import { AdminLogo } from "brand-kit/logos";
import Link from "next/link";
import { useNavbar } from "./hook";
import { Skeleton } from "ui/shad-cn";
import Image from "next/image";
import { Menu } from "lucide-react";

const Navbar = () => {
	const { admin, isAdminLoading } = useNavbar();

	return (
		<nav className="w-full flex px-3 py-2 fixed top-0 left-0 items-center z-30 bg-white dark:bg-primary-dark">
			<button
				className="mr-2 text-primary-dark dark:text-primary-light"
				aria-label="menu toggle button"
			>
				<Menu size={20} />
			</button>

			<Link href="/">
				<AdminLogo />
			</Link>

			<div className="flex-1 flex justify-end items-center">
				<div className="w-9 h-9 flex items-center justify-center border-2 border-primary-dark dark:border-primary-light rounded-lg">
					{isAdminLoading || !admin ? (
						<Skeleton className="w-full h-full rounded-md bg-secondary-gray dark:bg-dark-gray" />
					) : (
						<Link href="/profile" className="w-full h-full p-0.5">
							<Image
								src={`https://api.dicebear.com/7.x/avataaars/png?seed=${admin.email}`}
								width={100}
								height={100}
								alt=""
								className="h-full w-full object-contain"
							/>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
