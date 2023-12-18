import { authAtom, authStateLoadAtom } from "@/atoms";
import { useAPIErrorHandler } from "@/hooks";
import { useCheckPrevAuthenticated } from "@/services/api/auth";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";

export const usePrevAuthChecker = () => {
	const {
		previouslyAuthenticatedResponse,
		prevAuthCheckingError,
		checkPrevAuthenticated,
	} = useCheckPrevAuthenticated();

	const isAppMounted = useRef<boolean>(false);
	const setIsAuthenticated = useSetRecoilState<boolean>(authAtom);
	const setPrevAuthStateLoaded =
		useSetRecoilState<boolean>(authStateLoadAtom);
	const { APIErrorHandler } = useAPIErrorHandler();

	const prevAuthCheckingErrorHandler = APIErrorHandler();

	useEffect(() => {
		if (isAppMounted.current) return;

		isAppMounted.current = true;
		checkPrevAuthenticated();
	}, []);

	useEffect(() => {
		if (prevAuthCheckingError) {
			prevAuthCheckingErrorHandler(prevAuthCheckingError);
		}
	}, [prevAuthCheckingError]);

	useEffect(() => {
		if (previouslyAuthenticatedResponse !== undefined) {
			setIsAuthenticated(previouslyAuthenticatedResponse.isAuthenticated);
			setPrevAuthStateLoaded(false);
		}
	}, [previouslyAuthenticatedResponse]);

	return {};
};
