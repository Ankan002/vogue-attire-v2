import { tailwindConfig } from "tailwind-config";
import { Config } from "tailwindcss";

const config: Config = {
	...tailwindConfig,
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"../../packages/brand-kit/**/*.{js,ts,jsx,tsx,mdx}",
	],
};

export default config;
