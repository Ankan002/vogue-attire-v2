"use client";

import { useThemeToggleBtn } from "./hook";
import { Sun, Moon } from "lucide-react";

const ThemeToggleBtn = () => {
	const { theme, onToggleClick } = useThemeToggleBtn();

	return (
		<button
			className="fixed bottom-5 right-5 border border-primary-dark dark:border-primary-light text-primary-dark dark:text-primary-light p-1.5 flex items-center justify-center transition-none rounded-lg"
			onClick={onToggleClick}
			aria-label="Theme Toggle Button"
		>
			{theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
		</button>
	);
};

export default ThemeToggleBtn;
