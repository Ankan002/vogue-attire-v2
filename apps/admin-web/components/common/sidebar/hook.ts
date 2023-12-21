import { menuActiveAtom } from "@/atoms";
import { useRecoilValue } from "recoil";

export const useSidebar = () => {
	const isMenuActive = useRecoilValue<boolean>(menuActiveAtom);

	return {
		isMenuActive,
	};
};
