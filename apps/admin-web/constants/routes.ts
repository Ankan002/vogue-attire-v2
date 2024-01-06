import { MiddlewareAPIRoute } from "types/route";

export const protected_route_matchers = [];

export const protected_routes = ["/"];

export const unprotected_routes = ["/login"];

export const protected_api_route_matchers: Array<MiddlewareAPIRoute> = [];

export const protected_api_routes: Array<MiddlewareAPIRoute> = [
	{
		route: "/api/auth/logout",
		methods: ["POST"],
	},
];

export const unprotected_api_routes: Array<MiddlewareAPIRoute> = [
	{
		route: "/api/auth/login",
		methods: ["POST"],
	},
];
