import { adminAtom, adminLoadingAtom } from "@/atoms";
import { DerivedAdmin } from "@/types/derived";
import { useRecoilValue } from "recoil";

export const useNavbar = () => {
	const isAdminLoading = useRecoilValue<boolean>(adminLoadingAtom);
	const admin = useRecoilValue<DerivedAdmin | null>(adminAtom);

	return {
		isAdminLoading: isAdminLoading,
		admin,
	};
};
