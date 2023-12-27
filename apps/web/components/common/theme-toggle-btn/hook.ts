import { useRecoilState } from "recoil";
import { Theme } from "types/common";
import { themeAtom } from "@/atoms";

export const useThemeToggleBtn = () => {
	const [currentTheme, setCurrentTheme] = useRecoilState<Theme>(themeAtom);

	const onToggleClick = () => {
		setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
		localStorage.setItem(
			"theme",
			currentTheme === "light" ? "dark" : "light",
		);
	};

	return {
		theme: currentTheme,
		onToggleClick,
	};
};
