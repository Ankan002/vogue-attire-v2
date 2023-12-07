import { getTursoPrismaClient, PrismaClient } from "database";

let prismaClient: PrismaClient | null = null;

export const getDbInstance = () => {
	if (!prismaClient) {
		prismaClient = getTursoPrismaClient({
			authToken: process.env["DB_AUTH_TOKEN"] ?? "",
			databaseUrl: process.env["DB_URI"] ?? "",
		});
	}

	return prismaClient;
};
