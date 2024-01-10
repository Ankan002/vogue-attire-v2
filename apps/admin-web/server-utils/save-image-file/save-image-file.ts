import { randomUUID } from "crypto";
import { existsSync, mkdirSync, writeFile } from "fs";
import { cwd } from "process";

export const saveImageFile = async (imageFile: File): Promise<string> => {
	const filePath =
		cwd() + `/temp/${randomUUID()}.${imageFile.type.split("/")[1]}`;

	if (!existsSync(cwd() + "/temp")) {
		mkdirSync(cwd() + "/temp");
	}

	const fileArrayBuffer = await imageFile.arrayBuffer();
	const fileBuffer = Buffer.from(fileArrayBuffer);

	return new Promise((resolve, reject) => {
		writeFile(filePath, fileBuffer, (err) => {
			if (err) {
				if (err instanceof Error) reject(err.message);
				reject("Something went wrong!!");
			}

			resolve(filePath);
		});
	});
};
