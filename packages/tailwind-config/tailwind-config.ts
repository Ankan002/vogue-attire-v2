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
			colors: {
				"primary-light": "#F4F6FA",
				"secondary-light": "#F1F2F6",
				white: "#FFFFFF",
				"light-gray": "#F1F1F1",
				"secondary-gray": "#B6BBC4",
				"dark-gray": "#888",
				"light-cyan": "#E3F6FD",
				thistle: "#E8DEF5",
				"primary-dark": "#080202",
				"secondary-dark": "#333333",
				"tertiary-dark": "#090910",
				"primary-orange": "#ff4d4d",
				"primary-yellow": "#fbca00",
				"semi-transparent": "rgba(0, 0, 0, 0.6)",
				"primary-green": "#08CD92",
				"primary-red": "#D61C4E",
				"prussian-blue": "#007cf0",
				"blue-hue": "#01dfd8",
				"dark-purple": "#7d00d9",
				"dark-pink": "#ff0080",
				"rose-pink": "#e2008e",
			},
		},
	},
	plugins: [],
};
