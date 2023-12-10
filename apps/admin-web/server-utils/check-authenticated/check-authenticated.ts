import { NextRequest } from "next/server";

export const checkAuthenticated= (req: NextRequest) => {
	const authCookie = req.cookies.get(
		process.env["COOKIE_NAME"] ?? "auth-token",
	)?.value;

	if (!authCookie) {
		return {
			success: false,
			error: "No Auth Cookie Found!!",
		};
	}
};
