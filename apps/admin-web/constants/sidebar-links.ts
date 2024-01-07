import {
	Calculator,
	Home,
	Image,
	Package,
	ShoppingCart,
	Tag,
	User,
} from "lucide-react";
import { SidebarLink } from "@/types/common";

export const sidebarLinks: Array<SidebarLink> = [
	{
		id: 1,
		route: "/",
		name: "Home",
		Icon: Home,
	},
	{
		id: 2,
		route: "/users",
		name: "Users",
		Icon: User,
	},
	{
		id: 3,
		route: "/products",
		name: "Products",
		Icon: ShoppingCart,
	},
	{
		id: 4,
		route: "/orders",
		name: "Orders",
		Icon: Package,
	},
	{
		id: 5,
		route: "/taxes",
		name: "Taxes",
		Icon: Calculator,
	},
	{
		id: 6,
		route: "/categories",
		name: "Categories",
		Icon: Tag,
	},
	{
		id: 7,
		route: "/assets",
		name: "Assets",
		Icon: Image,
	},
];
