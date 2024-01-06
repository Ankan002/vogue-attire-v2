import { useApiErrorHandler } from "@/hooks";
import { useGoogleLogin } from "@react-oauth/google";

export const useLoginSection = () => {
	const { APIErrorHandler } = useApiErrorHandler();

	const login = useGoogleLogin({
		onError: APIErrorHandler(),
		onSuccess: (googleResponse) => {
			console.log(googleResponse.access_token);
		},
	});

	const onLoginPress = () => {
		login();
	};

	return {
		onLoginPress,
	};
};
