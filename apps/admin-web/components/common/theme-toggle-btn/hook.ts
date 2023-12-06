import { themeAtom } from "@/atoms";
import { useRecoilState } from "recoil";
import { Theme } from "types/common";

export const useThemeToggleBtn = () => {
	const [currentTheme, setCurrentTheme] = useRecoilState<Theme>(themeAtom);

	const onToggleClick = () => {
		setCurrentTheme((prev) => (prev === "dark" ? "light" : "dark"));
		localStorage.setItem(
			"theme",
			currentTheme === "dark" ? "light" : "dark",
		);
	};

	return {
		theme: currentTheme,
		onToggleClick,
	};
};
