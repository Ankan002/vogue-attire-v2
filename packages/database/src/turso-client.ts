import { PrismaClient } from "@prisma/client";
// import { createClient } from "@libsql/client";
// import { PrismaLibSQL } from "@prisma/adapter-libsql";

interface Args {
	databaseUrl: string;
	authToken: string;
}

// ! NOTE: To use this project with libsql or turso turn on the adapter property. Or update as required at that point in time.
export const getTursoPrismaClient = (args: Args) => {
	// const { databaseUrl, authToken } = args;

	// const libSqlClient = createClient({
	// 	url: databaseUrl,
	// 	authToken,
	// });
	// const adapter = new PrismaLibSQL(libSqlClient);
	const prismaClient = new PrismaClient({
		// adapter,
	});

	return prismaClient;
};
