import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { RecoilProvider, ReactQueryProvider } from "common-providers";
import { ThemeProvider } from "@/components/providers";
import { ThemeToggleBtn } from "@/components/common";

export const metadata: Metadata = {
	title: "Vogue Attire Admin",
	description: "The Protected ADMIN CMS for Vogue Attire",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${GeistSans.variable} ${GeistMono.variable}`}>
				<ReactQueryProvider>
					<RecoilProvider>
						<ThemeProvider>
							{children}
							<ThemeToggleBtn />
						</ThemeProvider>
					</RecoilProvider>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
