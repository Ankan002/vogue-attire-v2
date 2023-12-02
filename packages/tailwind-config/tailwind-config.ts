import { Config } from "tailwindcss";

export const tailwindConfig: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				"geist-sans": ["var(--font-geist-sans)"],
				"geist-mono": ["var(--font-geist-mono)"],
				quicksand: "'Quicksand', sans-serif",
				manrope: "'Manrope', sans-serif",
				"fira-code": "'Fira Code', monospace",
				muli: "'muli', sans-serif",
				oxanium: "'Oxanium', cursive",
			},
		},
	},
	plugins: [],
};
