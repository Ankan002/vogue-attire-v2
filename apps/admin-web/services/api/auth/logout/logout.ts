import { useMutation } from "@tanstack/react-query";
import { AsyncMutationFunction } from "types/react-query";

const logout = async () => {
	try {
		const response = await fetch("/api/auth/logout", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			credentials: "include",
		});

		if (response.status === 401) {
			throw new Error("401");
		}

		const data = await response.json();

		if (!data.success && data.code === 401) {
			throw new Error("401");
		}

		if (!data.success) {
			throw new Error(data.error ?? "Some Error Occurred!!");
		}

		return {
			success: true,
		};
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error("Some Error Occurred!!");
	}
};

interface LogoutResponse {
	success: boolean;
}

interface UseLogoutResponse {
	logout: AsyncMutationFunction<LogoutResponse, void>;
	isLoggingOut: boolean;
}

export const useLogout = (): UseLogoutResponse => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["logout"],
		mutationFn: logout,
	});

	return {
		logout: mutateAsync,
		isLoggingOut: isPending,
	};
};
