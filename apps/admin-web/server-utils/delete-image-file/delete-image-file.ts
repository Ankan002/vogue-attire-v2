import { unlink } from "fs";

export const deleteImageFile = (filePath: string) => {
	return new Promise((resolve, reject) => {
		unlink(filePath, (err) => {
			if (err) reject("Something went wrong!!");
			resolve("DONE!!");
		});
	});
};
