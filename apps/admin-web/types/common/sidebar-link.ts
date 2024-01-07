import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

export interface SidebarLink {
	id: number;
	route: string;
	name: string;
	Icon: IconType | LucideIcon;
}
