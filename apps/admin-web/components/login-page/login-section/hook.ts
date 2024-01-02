import { authAtom, authStateLoadAtom } from "@/atoms";
import { useAPIErrorHandler } from "@/hooks";
import { useLogin } from "@/services/api/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";

export const useLoginSection = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const setAuthenticated = useSetRecoilState<boolean>(authAtom);
	const isAuthStateLoaded = useSetRecoilState<boolean>(authStateLoadAtom);

	const { login, isLoggingIn } = useLogin();
	const router = useRouter();

	const { unprotectedAPIErrorHandler } = useAPIErrorHandler();
	const loginAPIErrorHandler = unprotectedAPIErrorHandler();

	const onLoginClick = async () => {
		if (!isAuthStateLoaded) {
			toast.error("We are loading the app hold on!!");
			return;
		}

		if (isLoggingIn) {
			toast.error("We are logging you in... Hold on!!");
			return;
		}

		if (email.length < 3) {
			toast.error("Enter a valid email!!");
			return;
		}

		if (password.length < 8 || password.length > 30) {
			toast.error("Email length cannot be less than 8 or more than 30");
			return;
		}

		try {
			toast.loading("Logging In...");
			const response = await login({
				email,
				password,
			});

			toast.dismiss();

			if (!response) {
				toast.error("Something went Wrong!!");
				return;
			}

			toast.success("Welcome Master!!");
			setAuthenticated(true);
			// TODO: fall back to default next js routing once the routing bug is resolved!!
			// window.location.replace("/");
			router.replace("/");
		} catch (error) {
			console.log(error);
			toast.dismiss();
			loginAPIErrorHandler(error);
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
