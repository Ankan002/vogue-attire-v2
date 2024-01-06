import { authAtom } from "@/atoms";
import { useApiErrorHandler } from "@/hooks";
import { useLogin } from "@/services/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";

export const useLoginSection = () => {
	const { APIErrorHandler, unprotectedAPIErrorHandler } =
		useApiErrorHandler();

	const { login, isLoggingIn } = useLogin();
	const loginErrorHandler = unprotectedAPIErrorHandler();
	const setIsAuthenticated = useSetRecoilState<boolean>(authAtom);
	const router = useRouter();

	const googleLogin = useGoogleLogin({
		onError: APIErrorHandler(),
		onSuccess: async (googleResponse) => {
			if (!googleResponse.access_token) {
				toast.error("Some Google Error Occurred!");
				return;
			}

			toast.loading("Logging in...");

			try {
				const response = await login({
					accessToken: googleResponse.access_token,
				});

				toast.dismiss();

				if (!response) {
					toast.error("Some Error Occurred!!");
					return;
				}

				toast.success("Logged In Successfully...");
				setIsAuthenticated(true);
				router.replace("/");
			} catch (error) {
				toast.dismiss();
				loginErrorHandler(error);
			}
		},
	});

	const onLoginPress = () => {
		if (isLoggingIn) {
			toast.error("Hold on we are login you in!!");
			return;
		}

		googleLogin();
	};

	return {
		onLoginPress,
	};
};
