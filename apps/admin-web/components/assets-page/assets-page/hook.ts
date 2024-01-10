import { menuActiveAtom } from "@/atoms";
import { useRecoilValue } from "recoil";

export const useAssetsPage = () => {
	const isMenuActive = useRecoilValue<boolean>(menuActiveAtom);

	return {
		isMenuActive,
	};
};
