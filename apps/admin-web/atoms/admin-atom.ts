import { Admin } from "database";
import { atom } from "recoil";

export const adminAtom = atom<Omit<Admin, "password"> | null>({
	key: "adminAtom",
	default: null,
});
