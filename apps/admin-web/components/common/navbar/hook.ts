import { adminAtom, adminLoadingAtom, menuActiveAtom } from "@/atoms";
import { DerivedAdmin } from "@/types/derived";
import { useSetRecoilState, useRecoilValue } from "recoil";

export const useNavbar = () => {
	const isAdminLoading = useRecoilValue<boolean>(adminLoadingAtom);
	const admin = useRecoilValue<DerivedAdmin | null>(adminAtom);
	const setIsMenuActive = useSetRecoilState<boolean>(menuActiveAtom);

	const toggleBooleanState =
		(setState: React.Dispatch<React.SetStateAction<boolean>>) => () => {
			setState((prev) => !prev);
		};

	return {
		isAdminLoading: isAdminLoading,
		admin,
		toggleMenu: toggleBooleanState(setIsMenuActive),
	};
};
