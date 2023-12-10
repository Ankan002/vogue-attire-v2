import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { NextRequest } from "next/server";

interface JwtTokenPayload extends jwt.JwtPayload {
	user?: {
		email: string;
		id: string;
	};
}

type CheckAuthenticatedResponse =
	| {
			success: true;
			user: {
				email: string;
				id: string;
			};
	  }
	| {
			success: false;
			error: string;
	  };

export const checkAuthenticated = (
	req: NextRequest,
): CheckAuthenticatedResponse => {
	const authCookie = req.cookies.get(
		process.env["COOKIE_NAME"] ?? "auth-token",
	)?.value;

	if (!authCookie) {
		return {
			success: false,
			error: "No Auth Cookie Found!!",
		};
	}

	try {
		const jwtPayload = jwt.verify(
			authCookie,
			process.env["JWT_SECRET"] ?? "",
		) as JwtTokenPayload;

		if (!jwtPayload.user || !jwtPayload.user.id || !jwtPayload.user.email) {
			return {
				success: false,
				error: "Invalid token... Access Denied!! Please clear your cookies and re-login!!",
			};
		}

		return {
			success: true,
			user: jwtPayload.user,
		};
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			return {
				success: false,
				error: "Invalid Token... Access Denied!!",
			};
		}

		if (error instanceof Error) {
			return {
				success: false,
				error: error.message,
			};
		}

		return {
			success: false,
			error: "Some Error Occurred!! Please clear the cookies and try to re-login!!",
		};
	}
};
