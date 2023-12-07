import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { RecoilProvider, ReactQueryProvider } from "common-providers";
import { ThemeProvider } from "@/components/providers";
import { ThemeToggleBtn } from "@/components/common";
import { getDbInstance } from "@/config";

export const metadata: Metadata = {
	title: "Vogue Attire Admin",
	description: "The Protected ADMIN CMS for Vogue Attire",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const db = getDbInstance();

	const startTime = Date.now();

	const admin = await db.admin.findUnique({
		where: {
			email: "ankanbhattacharya89@gmail.com",
		},
		select: {
			id: true,
			email: true,
			name: true,
		},
	});

	const endTime = Date.now();
	
	console.log("Time taken:", (endTime - startTime), "ms");

	console.log(admin);

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
