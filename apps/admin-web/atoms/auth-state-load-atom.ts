import { atom } from "recoil";

export const authStateLoadAtom = atom<boolean>({
	key: "authStateLoadAtom",
	default: false,
});
