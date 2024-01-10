import { NextRequest, NextResponse } from "next/server";
import { Controller } from "types/api";
import { APIError } from "./api-error";

export const APIHandler =
	<D = void>(handlerFunction: Controller<D>): Controller<D> =>
	async (request: NextRequest) => {
		try {
			return await handlerFunction(request);
		} catch (error) {
			if (error instanceof APIError) {
				return NextResponse.json(
					{
						success: false,
						error: error.message,
						code: error.code,
					},
					{
						status: error.code,
					},
				);
			}

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
					error: "Internal Server Error",
					code: 500,
				},
				{
					status: 500,
				},
			);
		}
	};
