import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

const checkPrevAuthenticated = async () => {
	try {
		const response = await fetch("/api/auth/check-authenticated", {
			method: "GET",
			headers: {
				"content-type": "application/json",
			},
			credentials: "include",
		});

		const data = await response.json();

		if (data.success === undefined || data.success === null) {
			throw new Error("Something went wrong!!");
		}

		return {
			isAuthenticated: data.success as boolean,
		};
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error("Some Error Occurred!!");
	}
};

export const useCheckPrevAuthenticated = async () => {
	const { refetch, isLoading, error, data } = useQuery({
		queryKey: ["check-authenticated"],
		queryFn: checkPrevAuthenticated,
		enabled: false,
		retry: 0,
	});

	const checkPrevAuthenticatedFn = useCallback(() => {
		refetch();
	}, [refetch]);

	return {
		checkPrevAuthenticated: checkPrevAuthenticatedFn,
		isCheckingPrevAuthenticated: isLoading,
		prevAuthCheckingError: error,
		isPreviouslyAuthenticated: data,
	};
};
