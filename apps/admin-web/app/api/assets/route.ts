import { getDbInstance } from "@/config";
import { deleteImageFile, getCloudinary, saveImageFile } from "@/server-utils";
import { ImageAsset } from "database";
import { NextResponse } from "next/server";
import { APIError, APIHandler } from "utils";
import { z } from "zod";

const UploadAssetBodySchema = z.object({
	tag: z.string().trim().optional(),
});

interface UploadAssetResponseData {
	imageAsset: ImageAsset;
}

export const POST = APIHandler<UploadAssetResponseData>(async (request) => {
	const requestFormData = await request.formData();

	const tag = requestFormData.get("tag");

	const imageAsset = requestFormData.get("image");

	if (
		!imageAsset ||
		!(imageAsset instanceof File) ||
		!imageAsset.type.startsWith("image") ||
		imageAsset.size / (1024 * 1024) > 2
	) {
		throw new APIError(
			"Please provide a valid image file whose size is less than 2 MB",
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
	const cloudinary = getCloudinary();

	const uploadedImage = await cloudinary.uploader.upload(savedFilePath, {
		folder: process.env["CLOUDINARY_FOLDER"] ?? "",
	});

	const db = getDbInstance();

	const createdImageAsset = await db.imageAsset.create({
		data: {
			image: uploadedImage.url,
			tag: requestBody.tag ?? null,
		},
		select: {
			id: true,
			image: true,
			tag: true,
			created_at: true,
			updated_at: true,
		},
	});

	deleteImageFile(savedFilePath);

	return NextResponse.json(
		{
			success: true,
			code: 200,
			data: {
				imageAsset: createdImageAsset,
			},
		},
		{
			status: 200,
		},
	);
});
