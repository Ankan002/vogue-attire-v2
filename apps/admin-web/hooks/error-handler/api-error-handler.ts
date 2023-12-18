import { authAtom } from "@/atoms";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";

type ErrorHandlerFunc = (error: Error) => void;

export const useAPIErrorHandler = () => {
	const router = useRouter();
	const setIsAuthenticated = useSetRecoilState<boolean>(authAtom);

	const protectedAPIHandlerError =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			// TODO: Add toast handler.
			if (error instanceof Error) {
				if (error.message === "401") {
					setIsAuthenticated(false);
					router.replace("/login");
					return;
				}

				if (customHandler) {
					customHandler(error);
					return;
				}

				console.log(error.message);
				return;
			}

			console.log("Some Error Ocurred!!");
		};

	const unprotectedAPIHandlerError =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			// TODO: Add toast handler.
			if (error instanceof Error) {
				if (error.message === "401") {
					setIsAuthenticated(true);
					router.replace("/");
					return;
				}

				if (customHandler) {
					customHandler(error);
					return;
				}

				console.log(error.message);
				return;
			}

			console.log("Some Error Ocurred!!");
		};

	const APIHandlerError =
		(customHandler?: ErrorHandlerFunc) => (error: unknown) => {
			// TODO: Add toast handler.
			if (error instanceof Error) {
				if (customHandler) {
					customHandler(error);
					return;
				}

				console.log(error.message);
				return;
			}

			console.log("Some Error Ocurred!!");
		};

	return {
		protectedAPIHandlerError,
		unprotectedAPIHandlerError,
		APIHandlerError,
	};
};
