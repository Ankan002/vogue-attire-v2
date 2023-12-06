import gradient from "gradient-string";

export const getHeading = (text: string): string => {
	const heading = gradient([
		"#fbca00",
		"#08CD92",
		"#01dfd8",
		"#7d00d9",
		"#ff0080",
		"#e2008e",
		"#D61C4E",
	])(text);

	return heading;
};

export const getWarning = (text: string): string => {
	const warning = gradient(["#ff0080", "#e2008e"])(text);

	return warning;
};
