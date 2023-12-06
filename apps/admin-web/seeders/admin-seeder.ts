import "dotenv/config";
import { getDbInstance } from "@/config";
import { genSalt, hash } from "bcrypt";

const seedAdmin = async () => {
	const db = getDbInstance();

	try {
		const salt = await genSalt(10);
		const password = await hash(
			process.env["DUMMY_SEEDER_ADMIN_PASSWORD"] ?? "12345678",
			salt,
		);

		await db.admin.create({
			data: {
				name: "Ankan Bhattacharya",
				email: "ankanbhattacharya89@gmail.com",
				password,
			},
			select: {
				id: true,
				email: true,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			console.log(error.stack);
			return;
		}

		console.log(error);
	}
};

seedAdmin();
