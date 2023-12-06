"use client";

import { QueryClientProvider, QueryClient } from "react-query";

interface Props {
	children: React.ReactNode;
}

const ReactQueryProvider = (props: Props) => {
	const { children } = props;

	const client = new QueryClient();

	return (
		<QueryClientProvider client={client}>{children}</QueryClientProvider>
	);
};

export default ReactQueryProvider
