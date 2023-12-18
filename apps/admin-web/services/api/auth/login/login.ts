import { useMutation } from "@tanstack/react-query";
import { AsyncMutationFunction } from "types/react-query";

interface Args {
	email: string;
	password: string;
}

const login = async (args: Args) => {
	const { email, password } = args;

	try {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await response.json();

		if (!data.success) {
			throw new Error(data.error ?? "Something went wrong!!");
		}

		return true;
	} catch (error) {
		if (error instanceof Error) {
			throw Error(error.message);
		}

		throw new Error("Some error occurred!!");
	}
};

interface HookResponse {
	login: AsyncMutationFunction<boolean, Args>;
	isLoggingIn: boolean;
}

export const useLogin = (): HookResponse => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["login"],
		mutationFn: login,
		retry: 0,
	});

	return {
		login: mutateAsync,
		isLoggingIn: isPending,
	};
};
