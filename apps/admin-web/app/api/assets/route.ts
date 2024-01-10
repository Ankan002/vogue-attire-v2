import { NextResponse } from "next/server";
import { APIHandler } from "utils";

export const POST = APIHandler(async (request) => {
	// const requestFormData = await request.formData();

	// const tag = requestFormData.get("")

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
