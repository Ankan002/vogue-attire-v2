import { NextResponse } from "next/server";
import { APIHandler } from "utils";

export const POST = APIHandler(async (request) => {
	// if (request.method === "POST") {
	// 	throw new APIError("BOOM!! MF", 400);
	// }

	return NextResponse.json(
		{
			success: true,
			code: 200,
		},
		{
			status: 200,
		},
	);
});
