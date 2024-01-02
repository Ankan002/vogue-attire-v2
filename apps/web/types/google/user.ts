import { GoogleUserSchema } from "@/zod/google";
import { z } from "zod";

export type GoogleUser = z.infer<typeof GoogleUserSchema>;
