import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "./api-response";

export type Controller<D = void> = (
	req: NextRequest,
) => Promise<NextResponse<ApiResponse<D>>>;
