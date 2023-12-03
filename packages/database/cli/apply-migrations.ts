import { getTextInput } from "helpers/get-text-input";

const applyMigrations = async () => {
	console.log(
		"********************************************************************",
	);
	console.log(
		"NOTE: Install Turso CLI and login to the account you ant to access!!",
	);
	console.log(
		"********************************************************************",
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

		console.log(devDatabaseName);
		console.log(prodDatabaseName);
	} catch (error) {
		if (error instanceof Error) {
			console.log(`Error: ${error.message}`);
			return;
		}

		console.log("Something went wrong!!");
	}
};

applyMigrations();
