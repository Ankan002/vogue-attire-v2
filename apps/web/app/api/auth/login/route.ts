import { ApiResponse, Controller } from "types/api";
import { NextResponse } from "next/server";
import { getDBInstance } from "@/config";
import { GoogleUserSchema } from "@/zod/google";
import { sign as jwtSign } from "jsonwebtoken";

export const POST: Controller = async (request) => {
	const googleAccessToken = request.headers.get(
		process.env["LOGIN_GOOGLE_HEADER_NAME"] ?? "google-access-token",
	);

	if (!googleAccessToken) {
		return NextResponse.json(
			{
				success: false,
				error: "Please provide a valid google access token!!",
				code: 403,
			},
			{
				status: 403,
			},
		);
	}

	try {
		const googleResponse = await fetch(
			process.env["GOOGLE_PROFILE_OAUTH_URL"] ?? "",
			{
				method: "GET",
				headers: {
					"content-type": "application/json",
					authorization: `Bearer ${googleAccessToken}`,
				},
			},
		);

		const googleResponseData = await googleResponse.json();

		const googleProfileSchemaValidationResult =
			GoogleUserSchema.safeParse(googleResponseData);

		if (!googleProfileSchemaValidationResult.success) {
			return NextResponse.json(
				{
					success: false,
					error: "Some problem with Google occurred!!",
					code: 400,
				},
				{
					status: 400,
				},
			);
		}

		const googleProfile = googleProfileSchemaValidationResult.data;

		const db = getDBInstance();

		const user = await db.user.upsert({
			where: {
				provider_id: googleProfile.sub,
			},
			select: {
				name: true,
				email: true,
				id: true,
				avatar: true,
				username: true,
				is_active: true,
				is_banned: true,
				provider_id: true,
				created_at: true,
				updated_at: true,
			},
			create: {
				email: googleProfile.email,
				name: googleProfile.name,
				username: `${googleProfile.email.split("@")[0]}_gal`,
				avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${googleProfile.email}`,
				provider_id: googleProfile.sub,
			},
			update: {},
		});

		if (user.is_banned) {
			return NextResponse.json(
				{
					success: false,
					error: "The user is not currently active",
					code: 401,
				},
				{
					status: 401,
				},
			);
		}

		if (!user.is_active) {
			return NextResponse.json(
				{
					success: false,
					error: "The user is not currently active",
					code: 401,
				},
				{
					status: 401,
				},
			);
		}

		const authToken = jwtSign(
			{
				user: {
					id: user.id,
					email: user.email,
				},
			},
			process.env["JWT_SECRET"] ?? "",
		);

		const response = NextResponse.json<ApiResponse>(
			{
				code: 200,
				success: true,
			},
			{
				status: 200,
			},
		);

		response.cookies.set(
			process.env["COOKIE_NAME"] ?? "auth-token",
			authToken,
			{
				httpOnly: true,
				secure: process.env["ENV"] === "production",
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
			},
		);

		return response;
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json(
				{
					success: false,
					code: 400,
					error: error.message,
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
