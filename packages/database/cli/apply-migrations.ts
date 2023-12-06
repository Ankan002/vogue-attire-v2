import { executeShellCommand } from "helpers/execute-shell-command";
import { getTextInput } from "helpers/get-text-input";
import { getHeading, getWarning } from "utils/get-heading";

const applyMigrations = async () => {
	console.log(getHeading("****************************"));
	console.log(getHeading("WElCOME TO THE MIGRATION CLI"));
	console.log(getHeading("****************************"));
	console.log(
		getWarning(
			"NOTE: Install Turso CLI and login to the account you ant to access!!",
		),
	);

	try {
		const devDatabaseName = await getTextInput({
			question:
				"Enter your dev environment database name, enter `.env` id you want to load the name from environment variables: ",
			defaultAnswer: ".env",
			key: "devDatabaseName",
		});

		const prodDatabaseName = await getTextInput({
			question:
				"Enter your dev environment database name, enter `.env` id you want to load the name from environment variables: ",
			defaultAnswer: ".env",
			key: "prodDatabaseName",
		});

		const migrationFolderName = await getTextInput({
			question: "Enter folder Name: ",
			key: "migrationFolderName",
		});

		console.log(
			`⌛ Applying migration on dev database ${
				devDatabaseName === ".env"
					? process.env["DEV_DB_NAME"]
					: devDatabaseName
			}`,
		);

		await executeShellCommand({
			command: `turso db shell ${
				devDatabaseName === ".env"
					? process.env["DEV_DB_NAME"]
					: devDatabaseName
			} < prisma/migrations/${migrationFolderName}/migration.sql`,
		});

		console.log(
			`✅ Applied migration to dev database ${
				devDatabaseName === ".env"
					? process.env["DEV_DB_NAME"]
					: devDatabaseName
			}`,
		);

		console.log(
			`⌛ Applying migration on production database ${
				prodDatabaseName === ".env"
					? process.env["PROD_DB_NAME"]
					: prodDatabaseName
			}`,
		);

		await executeShellCommand({
			command: `turso db shell ${
				prodDatabaseName === ".env"
					? process.env["PROD_DB_NAME"]
					: prodDatabaseName
			} < prisma/migrations/${migrationFolderName}/migration.sql`,
		});

		console.log(
			`✅ Applied migration to production database ${
				prodDatabaseName === ".env"
					? process.env["PROD_DB_NAME"]
					: prodDatabaseName
			}`,
		);
	} catch (error) {
		if (error instanceof Error) {
			console.log(`Error: ${error.message}`);
			return;
		}

		console.log("Something went wrong!!");
	}
};

applyMigrations();
