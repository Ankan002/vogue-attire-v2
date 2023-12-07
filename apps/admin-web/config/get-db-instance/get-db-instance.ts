import { PrismaClient } from "database";

let prismaClient: PrismaClient | null = null;

export const getDbInstance = () => {
	if (!prismaClient) {
		prismaClient = new PrismaClient();
	}

	return prismaClient;
};
