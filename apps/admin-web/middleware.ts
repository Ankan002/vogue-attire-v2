import { NextRequest, NextResponse } from "next/server";
import {
	protected_route_matchers,
	unprotected_routes,
	protected_routes,
	unprotected_api_routes,
	protected_api_route_matchers,
	protected_api_routes,
} from "@/constants/routes";

export const middleware = (request: NextRequest) => {
	const cookie = request.cookies.get(
		process.env["COOKIE_NAME"] ?? "auth-token",
	)?.value;

	const currentRoute = request.nextUrl.pathname;

	if (currentRoute.includes("/api")) {
		for (const route of unprotected_api_routes) {
			if (currentRoute === route) {
				if (cookie) {
					return new NextResponse(
						JSON.stringify({
							success: false,
							error: "You are already logged in, you should not be logged in to access here!!",
							status: 401,
						}),
						{
							status: 401,
						},
					);
				} else {
					NextResponse.next();
				}
			}
		}

		for (const route of protected_api_route_matchers) {
			if (currentRoute.startsWith(route)) {
				if (cookie) return NextResponse.next();
				return new NextResponse(
					JSON.stringify({
						success: false,
						error: "Access Denied!!",
						status: 401,
					}),
					{
						status: 401,
					},
				);
			}
		}

		for (const route of protected_api_routes) {
			if (currentRoute === route) {
				if (cookie) return NextResponse.next();
				return new NextResponse(
					JSON.stringify({
						success: false,
						error: "Access Denied!!",
						status: 401,
					}),
					{
						status: 401,
					},
				);
			}
		}
	} else {
		for (const route of unprotected_routes) {
			if (currentRoute === route) {
				if (cookie) return NextResponse.redirect("/");
				return NextResponse.next();
			}
		}

		for (const route of protected_route_matchers) {
			if (currentRoute.startsWith(route)) {
				if (cookie) return NextResponse.next();
				return NextResponse.redirect("/login");
			}
		}

		for (const route of protected_routes) {
			if (currentRoute === route) {
				if (cookie) return NextResponse.next();
				return NextResponse.redirect("/login");
			}
		}

		return NextResponse.next();
	}

	return NextResponse.next();
};
