import { useMutation } from "@tanstack/react-query";
import { AsyncMutationFunction } from "types/react-query";

interface Args {
	accessToken: string;
}

const login = async (args: Args) => {
	try {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"google-access-token": args.accessToken,
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

		return data.success as boolean;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}

		throw new Error("Some Error Occurred!!");
	}
};

interface HookResponse {
	login: AsyncMutationFunction<boolean, Args>;
	isLoggingIn: boolean;
}

export const useLogin = (): HookResponse => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["login"],
		retry: 0,
		mutationFn: login,
	});

	return {
		login: mutateAsync,
		isLoggingIn: isPending,
	};
};
