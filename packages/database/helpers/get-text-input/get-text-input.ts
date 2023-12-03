import { getInquirer } from "utils/get-inquirer";

interface Args {
	question: string;
	key: string;
	defaultAnswer?: string;
}

export const getTextInput = async (args: Args): Promise<string> => {
	const { question, key, defaultAnswer } = args;

	const inquirer = await getInquirer.inquirerInstance();

	const answer = await inquirer.prompt([
		{
			message: question,
			default: defaultAnswer,
			name: key,
		},
	]);

	if (!answer[key])
		throw Error("No such key found. Please contact the DEV!!");

	return answer[key];
};
