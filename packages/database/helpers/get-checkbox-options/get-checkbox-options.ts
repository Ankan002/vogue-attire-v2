import { getInquirer } from "utils/get-inquirer";

interface Args {
	question: string;
	options: Array<string>;
	key: string;
}

export const getCheckboxOptions = async (args: Args) => {
	const { question, options, key } = args;

	const inquirer = await getInquirer.inquirerInstance();

	const answer = await inquirer.prompt([
		{
			message: question,
			type: "checkbox",
			choices: options,
			name: key,
		},
	]);

	if (!answer[key])
		throw Error("No such key found. Please contact the DEV!!");

	return answer[key] as Array<string>;
};
