import { PrismaClient } from "@prisma/client";
import { createClient } from "@libsql/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";

interface Args {
	databaseUrl: string;
	authToken: string;
}

export const getPrismaClient = (args: Args) => {
	const { databaseUrl, authToken } = args;

	const libSqlClient = createClient({
		url: databaseUrl,
		authToken,
	});
	const adapter = new PrismaLibSQL(libSqlClient);
	const prismaClient = new PrismaClient({
		adapter,
	});

	return prismaClient;
};

export { PrismaClient, PrismaLibSQL };
