import { exec } from "node:child_process";

interface Args {
	command: string;
}

export const executeShellCommand = (args: Args) => {
	const { command } = args;

	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(error.message);
			}

			if (stderr) {
				reject(stderr);
			}

			resolve(stdout);
		});
	});
};
