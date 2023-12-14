import { useState } from "react";

export const useLoginSection = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

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
	};
};
