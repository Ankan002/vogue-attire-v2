import { getDbInstance } from "@/config";
import { NextResponse } from "next/server";
import { z } from "zod";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiResponse, Controller } from "types/api";

const PostBodySchema = z.object({
	email: z.string().email("Please provide a valid email"),
	password: z
		.string()
		.min(8, "Password should be at least 8 characters long")
		.max(30, "Password should be at most 30 characters long"),
});

export const POST: Controller = async (req) => {
	try {
		const requestBody = await req.json();

		const bodyValidationResult = PostBodySchema.safeParse(requestBody);

		if (!bodyValidationResult.success) {
			return NextResponse.json(
				{
					success: false,
					error: bodyValidationResult.error.errors[0]?.message ?? "",
					code: 400,
				},
				{
					status: 400,
				},
			);
		}

		const requestBodyData = bodyValidationResult.data;
		const db = getDbInstance();

		const admin = await db.admin.findUnique({
			where: {
				email: requestBodyData.email,
			},
			select: {
				id: true,
				is_active: true,
				email: true,
				password: true,
			},
		});

		if (!admin) {
			return NextResponse.json(
				{
					success: false,
					error: "No User Found!!",
					code: 401,
				},
				{
					status: 401,
				},
			);
		}

		if (!admin.is_active) {
			return NextResponse.json(
				{
					success: false,
					error: "You are not an active admin access denied!!",
					code: 401,
				},
				{
					status: 401,
				},
			);
		}

		const isPasswordCorrect = await compare(
			requestBodyData.password,
			admin.password,
		);

		if (!isPasswordCorrect) {
			return NextResponse.json(
				{
					success: false,
					error: "Incorrect Credentials access denied!!",
					code: 401,
				},
				{
					status: 401,
				},
			);
		}

		const jwtToken = jwt.sign(
			{
				user: {
					id: admin.id,
					email: admin.email,
				},
			},
			process.env["JWT_SECRET"] ?? "",
		);

		const response = NextResponse.json<ApiResponse>(
			{
				success: true,
				code: 200,
			},
			{
				status: 200,
			},
		);

		console.log(process.env["COOKIE_NAME"]);

		response.cookies.set(
			process.env["COOKIE_NAME"] ?? "auth-token",
			jwtToken,
			{
				httpOnly: true,
				secure: process.env["ENV"] === "production",
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),

				// ! If we further extend our functionality to beyond a single domain we would need to set this explicitly. But as of now we do not need so.
				// domain: process.env["COOKIE_DOMAIN"],
			},
		);

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

		console.log(error);

		return NextResponse.json(
			{
				success: false,
				error: "Internal Server Error",
				code: 500,
			},
			{
				status: 500,
			},
		);
	}
};
