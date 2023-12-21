import { adminAtom, adminLoadingAtom, authAtom } from "@/atoms";
import { useAPIErrorHandler } from "@/hooks";
import { useGetCurrentAdmin } from "@/services/api/admin";
import { DerivedAdmin } from "@/types/derived";
import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

export const useAdminManager = () => {
	const setCurrentAdmin = useSetRecoilState<DerivedAdmin | null>(adminAtom);
	const isAuthenticated = useRecoilValue<boolean>(authAtom);
	const setIsAdminLoading = useSetRecoilState<boolean>(adminLoadingAtom);
	const { protectedAPIErrorHandler } = useAPIErrorHandler();

	const getAdminErrorHandler = protectedAPIErrorHandler();

	// TODO: Handle loading case as well with a global state.
	const { adminData, adminFetchError, getCurrentAdmin, fetchingAdminData } =
		useGetCurrentAdmin();

	useEffect(() => {
		if (isAuthenticated && !fetchingAdminData) {
			getCurrentAdmin();
		}
	}, [isAuthenticated]);

	useEffect(() => {
		if (adminFetchError) getAdminErrorHandler(adminFetchError);
	}, [adminFetchError]);

	useEffect(() => {
		if (adminData) {
			console.log(adminData);
			setCurrentAdmin(adminData);
		}
	}, [adminData]);

	useEffect(() => {
		setIsAdminLoading(fetchingAdminData);
	}, [fetchingAdminData]);
};
