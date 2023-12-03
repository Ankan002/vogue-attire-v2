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

		console.log(devDatabaseName);
		console.log(prodDatabaseName);
		console.log(migrationFolderName);
	} catch (error) {
		if (error instanceof Error) {
			console.log(`Error: ${error.message}`);
			return;
		}

		console.log("Something went wrong!!");
	}
};

applyMigrations();
