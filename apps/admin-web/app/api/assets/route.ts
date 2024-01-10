import { deleteImageFile, saveImageFile } from "@/server-utils";
import { NextResponse } from "next/server";
import { APIError, APIHandler } from "utils";
import { z } from "zod";

const UploadAssetBodySchema = z.object({
	tag: z.string().trim().optional(),
});

export const POST = APIHandler(async (request) => {
	const requestFormData = await request.formData();

	const tag = requestFormData.get("tag");

	const imageAsset = requestFormData.get("image");

	if (
		!imageAsset ||
		!(imageAsset instanceof File) ||
		!imageAsset.type.startsWith("image") ||
		imageAsset.size / (1024 * 1024) > 10
	) {
		throw new APIError(
			"Please provide a valid image file whose size is less than 10MB",
			400,
		);
	}

	const uploadAssetBodyValidationResult = UploadAssetBodySchema.safeParse({
		tag,
	});

	if (!uploadAssetBodyValidationResult.success) {
		throw new APIError(
			uploadAssetBodyValidationResult.error.errors[0]?.message ??
				"Some Error Occurred!!",
			400,
		);
	}

	const requestBody = uploadAssetBodyValidationResult.data;

	const savedFilePath = await saveImageFile(imageAsset);

	console.log(savedFilePath);

	deleteImageFile(savedFilePath);

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
