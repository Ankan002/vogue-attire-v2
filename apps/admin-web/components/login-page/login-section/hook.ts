import { useState } from "react";

export const useLoginSection = () => {
	const [email, setEmail] = useState<string>("");

	const onTextChange =
		(setText: React.Dispatch<React.SetStateAction<string>>) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setText(e.target.value);
		};

	return {
		email,
		onEmailChange: onTextChange(setEmail),
	};
};
