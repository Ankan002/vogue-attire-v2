import { menuActiveAtom } from "@/atoms";
import { useRecoilValue } from "recoil";
import { usePathname } from "next/navigation";

export const useSidebar = () => {
	const isMenuActive = useRecoilValue<boolean>(menuActiveAtom);

	const currentPathname = usePathname();

	return {
		isMenuActive,
		currentPathname,
	};
};
