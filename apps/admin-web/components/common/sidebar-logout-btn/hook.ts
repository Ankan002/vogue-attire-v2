import { menuActiveAtom } from "@/atoms";
import { useRecoilValue } from "recoil";

export const useSidebarLogoutBtn = () => {
	const isMenuActive = useRecoilValue<boolean>(menuActiveAtom);

	return {
		isMenuActive,
	};
};
