import { NextResponse } from "next/server";

export const unauthorizedResponse = (error?: string) => {
	return NextResponse.json(
		{
			success: false,
			error: error ?? "Access Denied!!",
			code: 401,
		},
		{
			status: 401,
		},
	);
};
