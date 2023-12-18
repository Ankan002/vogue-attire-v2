import { NextResponse } from "next/server";
import { Controller } from "types/api";

export const GET: Controller = async (request) => {
	const authCookie = request.cookies.get(process.env["COOKIE_NAME"] ?? "")
		?.value;

	if (!authCookie) {
		return NextResponse.json({
			success: false,
			error: "Not Logged In!!",
			code: 400,
		});
	}

	return NextResponse.json({
		success: true,
		code: 200,
	});
};

export const revalidate = 0;
