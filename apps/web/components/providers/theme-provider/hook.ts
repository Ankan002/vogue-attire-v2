import { useRecoilState } from "recoil";
import { Theme } from "types/common";
import { themeAtom } from "@/atoms";
import { useEffect, useRef } from "react";

export const useThemeProvider = () => {
	const [theme, setTheme] = useRecoilState<Theme>(themeAtom);
	const isApLoaded = useRef<boolean>(false);

	const onAppLoad = () => {
		const prevSavedTheme = localStorage.getItem("theme");

		if (
			prevSavedTheme === null ||
			(prevSavedTheme !== "dark" && prevSavedTheme !== "light")
		) {
			setTheme("light");
			localStorage.setItem("theme", "light");
			return;
		}

		setTheme(prevSavedTheme);
	};

	useEffect(() => {
		if (isApLoaded.current) return;

		isApLoaded.current = true;
		onAppLoad();
	}, []);

	return {
		theme,
	};
};
