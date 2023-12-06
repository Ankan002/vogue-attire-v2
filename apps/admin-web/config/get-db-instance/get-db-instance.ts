import { getPrismaClient, PrismaClient, PrismaLibSQL } from "database";

let prismaClient: PrismaClient<{
	adapter: PrismaLibSQL;
}> | null = null;

export const getDbInstance = () => {
	if (!prismaClient) {
		prismaClient = getPrismaClient({
			authToken: process.env["DB_AUTH_TOKEN"] ?? "",
			databaseUrl: process.env["DB_URI"] ?? "",
		});
	}

	return prismaClient;
};
