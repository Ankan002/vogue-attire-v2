import { tailwindConfig } from "tailwind-config";
import { Config } from "tailwindcss";

const config: Config = {
	...tailwindConfig,
	content: [
		"./icons/**/*.{ts, js, jsx, tsx, mdx}",
		"./logos/**/*.{ts, js, jsx, tsx, mdx}",
	],
};

export default config;
