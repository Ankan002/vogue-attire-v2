import { themeAtom } from "@/atoms";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { Theme } from "types/common";

export const useThemeProvider = () => {
	const [theme, setTheme] = useRecoilState<Theme>(themeAtom);
	const isAppLoaded = useRef<boolean>(false);

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
		if (isAppLoaded.current) return;

		isAppLoaded.current = true;
		onAppLoad();
	}, []);

	return {
		theme,
	};
};
