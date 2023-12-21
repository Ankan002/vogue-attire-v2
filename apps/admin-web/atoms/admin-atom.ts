import { DerivedAdmin } from "@/types/derived/derived-admin";
import { atom } from "recoil";

export const adminAtom = atom<DerivedAdmin | null>({
	key: "adminAtom",
	default: null,
});
