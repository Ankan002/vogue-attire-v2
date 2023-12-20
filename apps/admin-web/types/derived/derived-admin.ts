import { Admin } from "database";

export type DerivedAdmin = Omit<Admin, "password">;
