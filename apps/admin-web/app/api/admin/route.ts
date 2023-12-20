import { getDbInstance } from "@/config";
import { checkAuthenticated, unauthorizedResponse } from "@/server-utils";
import { Admin } from "database";
import { NextResponse } from "next/server";
import { Controller } from "types/api";

interface ResponseData {
	admin: Omit<Admin, "password">;
}

export const GET: Controller<ResponseData> = async (request) => {
	const authResponse = checkAuthenticated(request);

	if (!authResponse.success) {
		return unauthorizedResponse();
	}

	const { user } = authResponse;

	try {
		const db = getDbInstance();

		const admin = await db.admin.findUnique({
			where: {
				id: user.id,
			},
			select: {
				id: true,
				email: true,
				name: true,
				is_active: true,
				created_at: true,
				updated_at: true,
			},
		});

		if (!admin) {
			return NextResponse.json(
				{
					success: false,
					error: "No such user found",
					code: 403,
				},
				{
					status: 403,
				},
			);
		}

		if (!admin.is_active) {
			return NextResponse.json(
				{
					success: false,
					error: "You are no longer an admin!!",
					code: 401,
				},
				{
					status: 401,
				},
			);
		}

		return NextResponse.json({
			success: true,
			data: {
				admin,
			},
			code: 200,
		});
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
	}
};

export const revalidate = 0;
