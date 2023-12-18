import { authAtom } from "@/atoms";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";

type ErrorHandlerFunc = (error: Error) => void;

export const useAPIErrorHandler = () => {
	const router = useRouter();
	const setIsAuthenticated = useSetRecoilState<boolean>(authAtom);

	const protectedAPIErrorHandler =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			if (error instanceof Error) {
				if (error.message === "401") {
					toast.error("You are not authenticated!!");
					setIsAuthenticated(false);
					router.replace("/login");
					return;
				}

				if (customHandler) {
					customHandler(error);
					return;
				}

				toast.error(error.message);
				return;
			}

			toast.error("Some Error Ocurred!!");
		};

	const unprotectedAPIErrorHandler =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			if (error instanceof Error) {
				if (error.message === "401") {
					toast.error("You are already authenticated!!");
					setIsAuthenticated(true);
					router.replace("/");
					return;
				}

				if (customHandler) {
					customHandler(error);
					return;
				}

				toast.error(error.message);
				return;
			}

			toast.error("Some Error Ocurred!!");
		};

	const APIErrorHandler =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			if (error instanceof Error) {
				if (customHandler) {
					customHandler(error);
					return;
				}

				toast.error(error.message);
				return;
			}

			toast.error("Some Error Ocurred!!");
		};

	return {
		protectedAPIErrorHandler,
		unprotectedAPIErrorHandler,
		APIErrorHandler,
	};
};
