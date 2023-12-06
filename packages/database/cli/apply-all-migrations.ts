import { executeShellCommand, getCheckboxOptions, getTextInput } from "helpers";
import { getHeading, getWarning } from "utils";
import { readdir } from "node:fs/promises";

const applyAllMigrations = async () => {
	console.log(getHeading("****************************"));
	console.log(getHeading("WElCOME TO THE MIGRATION CLI"));
	console.log(getHeading("****************************"));
	console.log(
		getWarning(
			"NOTE: Install Turso CLI and login to the account you ant to access!!",
		),
	);

	try {
		const environments = await getCheckboxOptions({
			options: ["dev", "prod"],
			key: "environments",
			question: "In which environments you want to migrate?",
		});

		if (environments.length <= 0) {
			console.log("No environments selected for migrations...");
			return;
		}

		let devDatabaseName: string | null = null;
		let prodDatabaseName: string | null = null;

		if (environments.includes("dev")) {
			devDatabaseName = await getTextInput({
				question:
					"Enter your dev environment database name, enter `.env` id you want to load the name from environment variables: ",
				defaultAnswer: ".env",
				key: "devDatabaseName",
			});
		}

		if (environments.includes("prod")) {
			prodDatabaseName = await getTextInput({
				question:
					"Enter your dev environment database name, enter `.env` id you want to load the name from environment variables: ",
				defaultAnswer: ".env",
				key: "prodDatabaseName",
			});
		}

		const folderObjects = await readdir("prisma/migrations", {
			withFileTypes: true,
		});

		const migrationsFolderNames = folderObjects
			.filter((object) => object.isDirectory())
			.map((direntObject) => direntObject.name)
			.sort((a, b) => {
				const timeA = Number(a.split("_")[0]);
				const timeB = Number(b.split("_")[0]);

				return timeA - timeB;
			});

		console.log(migrationsFolderNames);

		const devPromise = new Promise(async (resolve, reject) => {
			console.log(
				`⌛ Applying all migrations on dev database ${
					devDatabaseName === ".env"
						? process.env["DEV_DB_NAME"]
						: devDatabaseName
				}`,
			);

			for (const migrationFolderName of migrationsFolderNames) {
				try {
					await executeShellCommand({
						command: `turso db shell ${
							devDatabaseName === ".env"
								? process.env["DEV_DB_NAME"]
								: devDatabaseName
						} < prisma/migrations/${migrationFolderName}/migration.sql`,
					});

					console.log(
						`✅ Applied migration ${migrationFolderName} to dev database ${
							devDatabaseName === ".env"
								? process.env["DEV_DB_NAME"]
								: devDatabaseName
						}`,
					);
				} catch (error) {
					console.log(error);
					reject(
						`❌ Failed to migrate ${migrationFolderName} to dev database ${
							devDatabaseName === ".env"
								? process.env["DEV_DB_NAME"]
								: devDatabaseName
						}`,
					);
				}
			}

			resolve(
				`✅ Applied all migrations to dev database ${
					devDatabaseName === ".env"
						? process.env["DEV_DB_NAME"]
						: devDatabaseName
				}`,
			);
		});

		const prodPromise = new Promise(async (resolve, reject) => {
			console.log(
				`⌛ Applying all migrations on production database ${
					prodDatabaseName === ".env"
						? process.env["PROD_DB_NAME"]
						: prodDatabaseName
				}`,
			);

			for (const migrationFolderName of migrationsFolderNames) {
				try {
					await executeShellCommand({
						command: `turso db shell ${
							prodDatabaseName === ".env"
								? process.env["PROD_DB_NAME"]
								: prodDatabaseName
						} < prisma/migrations/${migrationFolderName}/migration.sql`,
					});

					console.log(
						`✅ Applied migration ${migrationFolderName} to production database ${
							prodDatabaseName === ".env"
								? process.env["PROD_DB_NAME"]
								: prodDatabaseName
						}`,
					);
				} catch (error) {
					console.log(error);
					reject(
						`❌ Failed to migrate ${migrationFolderName} to production database ${
							prodDatabaseName === ".env"
								? process.env["PROD_DB_NAME"]
								: prodDatabaseName
						}`,
					);
				}
			}

			resolve(
				`✅ Applied all migrations to production database ${
					prodDatabaseName === ".env"
						? process.env["PROD_DB_NAME"]
						: prodDatabaseName
				}`,
			);
		});

		const [devMigrationResult, prodMigrationResult] =
			await Promise.allSettled([devPromise, prodPromise]);

		if (devMigrationResult.status === "rejected") {
			console.log(devMigrationResult.reason);
		} else {
			console.log(devMigrationResult.value);
		}

		if (prodMigrationResult.status === "rejected") {
			console.log(prodMigrationResult.reason);
		} else {
			console.log(prodMigrationResult.value);
		}
	} catch (error) {
		console.log(error);
		if (error instanceof Error) {
			console.log(`Error: ${error.message}`);
			return;
		}

		console.log("Something went wrong!!");
	}
};

applyAllMigrations();
