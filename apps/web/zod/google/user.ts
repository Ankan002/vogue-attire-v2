import { z } from "zod";

export const GoogleUserSchema = z.object({
    sub: z.string(),
	name: z.string(),
	given_name: z.string(),
	family_name: z.string(),
	picture: z.string(),
	email: z.string().email("Please provide a valid email"),
	email_verified: z.boolean(),
	locale: z.string(),
})