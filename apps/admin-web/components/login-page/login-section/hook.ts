import { authAtom, authStateLoadAtom } from "@/atoms";
import { useLogin } from "@/services/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

export const useLoginSection = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const setAuthenticated = useSetRecoilState<boolean>(authAtom);
	const isAuthStateLoaded = useSetRecoilState<boolean>(authStateLoadAtom);

	const { login, isLoggingIn } = useLogin();
	const router = useRouter();

	const onLoginClick = async () => {
		if (!isAuthStateLoaded) {
			console.log("We are loading the app hold on!!");
			return;
		}

		if (isLoggingIn) {
			// TODO: Add the toast here for error handling;
			console.log("We are logging you in... Hold on!!");
			return;
		}

		if (email.length < 3) {
			console.log("Enter a valid email!!");
			return;
		}

		if (password.length < 8 || password.length > 30) {
			console.log("Email length cannot be less than 8 or more than 30");
			return;
		}

		// TODO: Add toast loaders here!!

		try {
			const response = await login({
				email,
				password,
			});

			if (!response) {
				console.log("Something went Wrong!!");
				return;
			}

			// TODO: Add success toasts, also auth states and some manager flows!!

			setAuthenticated(true);
			router.replace("/");
		} catch (error) {
			// TODO: Create a error handler hook
			if (error instanceof Error) {
				console.log(error.message);
				return;
			}

			console.log("Something went wrong!!");
		}
	};

	const onTextChange =
		(setText: React.Dispatch<React.SetStateAction<string>>) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setText(e.target.value);
		};

	const toggleState =
		(setState: React.Dispatch<React.SetStateAction<boolean>>) => () =>
			setState((prev) => !prev);

	return {
		email,
		password,
		isPasswordVisible,
		onEmailChange: onTextChange(setEmail),
		onPasswordChange: onTextChange(setPassword),
		togglePasswordVisible: toggleState(setIsPasswordVisible),
		onLoginClick,
	};
};
