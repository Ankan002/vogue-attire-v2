import { PrismaClient } from "database";

interface Client {
	prismaClient?: PrismaClient;
}

const client: Client = {};

export const getDBInstance = () => {
	if (!client.prismaClient) {
		const newClient = new PrismaClient();
		client.prismaClient = newClient;
	}

	return client.prismaClient;
};
