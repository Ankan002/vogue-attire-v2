import type { Config } from "tailwindcss";
import { tailwindConfig } from "tailwind-config";

const config: Config = {
	...tailwindConfig,
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
};
export default config;