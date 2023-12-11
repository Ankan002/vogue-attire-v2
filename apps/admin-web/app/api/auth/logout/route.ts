import { checkAuthenticated } from "@/server-utils";
import { error } from "console";
import { NextResponse } from "next/server";
import { ApiResponse, Controller } from "types/api";

export const POST: Controller = async (request) => {
	const isAuthenticated = checkAuthenticated(request);

	if (!isAuthenticated.success) {
		return NextResponse.json(
			{
				success: false,
				error: isAuthenticated.error,
				code: 401,
			},
			{
				status: 401,
			},
		);
	}

	try {
		const response = NextResponse.json<ApiResponse>(
			{
				success: true,
				code: 200,
			},
			{
				status: 200,
			},
		);

		response.cookies.delete(process.env["COOKIE_NAME"] ?? "auth-token");

		return response;
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(
				{
					success: false,
					error: error.message,
					code: 400,
				},
				{
					status: 400,
				},
			);
		}
	}

	console.log(error);

	return NextResponse.json(
		{
			success: false,
			error: "Internal Server Error!!",
			code: 500,
		},
		{
			status: 500,
		},
	);
};
