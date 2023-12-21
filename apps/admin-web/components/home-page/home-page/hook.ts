import { menuActiveAtom } from "@/atoms";
import { useRecoilValue } from "recoil";

export const useHomePage = () => {
	const isMenuActive = useRecoilValue<boolean>(menuActiveAtom);

	return {
		isMenuActive,
	};
};
