import { NextRequest, NextResponse } from "next/server";
import {
	protected_api_route_matchers,
	protected_api_routes,
	unprotected_api_routes,
	protected_route_matchers,
	protected_routes,
	unprotected_routes,
} from "@/constants/routes";

export const middleware = (request: NextRequest) => {
	const authToken = request.cookies.get(
		process.env["COOKIE_NAME"] ?? "auth-token",
	)?.value;

	const pathname = request.nextUrl.pathname;

	for (const route of unprotected_api_routes) {
		if (route === pathname) {
			if (authToken) {
				return NextResponse.json(
					{
						success: false,
						error: "You are already signed in!!",
						code: 400,
					},
					{
						status: 400,
					},
				);
			}

			return NextResponse.next();
		}
	}

	if (pathname.includes("/api")) {
		for (const route of protected_api_routes) {
			if (route === pathname) {
				if (!authToken) {
					return NextResponse.json(
						{
							success: false,
							error: "Access Denied!!",
							code: 401,
						},
						{
							status: 401,
						},
					);
				}

				return NextResponse.next();
			}
		}

		for (const routeMatcher of protected_api_route_matchers) {
			if (pathname.startsWith(routeMatcher)) {
				if (!authToken) {
					return NextResponse.json(
						{
							success: false,
							error: "Access Denied!!",
							code: 401,
						},
						{
							status: 401,
						},
					);
				}

				return NextResponse.next();
			}
		}

		return NextResponse.next();
	} else {
		for (const route of unprotected_routes) {
			if (route === pathname) {
				if (authToken)
					return NextResponse.redirect(process.env["NEXT_URL"] ?? "");

				return NextResponse.next();
			}
		}

		for (const route of protected_routes) {
			if (route === pathname) {
				if (!authToken)
					return NextResponse.redirect(
						`${process.env["NEXT_URL"]}/login`,
					);

				return NextResponse.next();
			}
		}

		for (const routeMatcher of protected_route_matchers) {
			if (pathname.startsWith(routeMatcher)) {
				if (!authToken)
					return NextResponse.redirect(
						`${process.env["NEXT_URL"]}/login`,
					);

				return NextResponse.next();
			}
		}

		return NextResponse.next();
	}
};
