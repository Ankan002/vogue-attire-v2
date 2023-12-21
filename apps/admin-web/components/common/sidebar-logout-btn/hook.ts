import { adminAtom, authAtom, menuActiveAtom } from "@/atoms";
import { useAPIErrorHandler } from "@/hooks";
import { useLogout } from "@/services/api/auth";
import { DerivedAdmin } from "@/types/derived";
import toast from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";

export const useSidebarLogoutBtn = () => {
	const isMenuActive = useRecoilValue<boolean>(menuActiveAtom);
	const setAdmin = useSetRecoilState<DerivedAdmin | null>(adminAtom);
	const setIsAuthenticated = useSetRecoilState<boolean>(authAtom);

	const { protectedAPIErrorHandler } = useAPIErrorHandler();

	const logoutErrorHandler = protectedAPIErrorHandler();

	const { logout, isLoggingOut } = useLogout();

	const onLogoutClick = async () => {
		if (isLoggingOut) {
			toast.error("Hold on we are logging you out!!");
			return;
		}

		toast.loading("Logging out!!");

		try {
			const { success } = await logout();

			toast.dismiss();

			if (!success) {
				toast.error("Some Error Occurred!!");
				return;
			}

			toast.success("Logged out successfully!!");
			setAdmin(null);
			setIsAuthenticated(false);
            // TODO: fall back to default next js routing once the routing bug is resolved!!
			window.location.replace("/");
		} catch (error) {
			logoutErrorHandler(error);
		}
	};

	return {
		isMenuActive,
		onLogoutClick,
	};
};
