import { useQuery } from "@tanstack/react-query";
import { Admin } from "database";
import { useCallback } from "react";

const getCurrentAdmin = async () => {
	try {
		const response = await fetch("/api/admin", {
			method: "GET",
			headers: {
				"content-type": "application/json",
			},
			credentials: "include",
		});

		if (response.status === 401) {
			throw new Error("401");
		}

		const data = await response.json();

		if (data.code === 401) {
			throw new Error("401");
		}

		if (!data.success) {
			throw new Error(data.error ?? "Some Error Occurred!!");
		}

		return data.data.admin as Omit<Admin, "password">;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message ?? "Some Error Occurred");
		}

		throw new Error("Some Error Occurred");
	}
};

export const useGetCurrentAdmin = () => {
	const { refetch, data, error, isLoading } = useQuery({
		queryKey: ["get-admin"],
		enabled: false,
		retry: 0,
		queryFn: getCurrentAdmin,
	});

	const fetchCurrentAdmin = useCallback(() => {
		refetch();
	}, [refetch]);

    return {
        getCurrentAdmin: fetchCurrentAdmin,
        adminData: data,
        adminFetchError: error,
        fetchingAdminData: isLoading
    }
};
