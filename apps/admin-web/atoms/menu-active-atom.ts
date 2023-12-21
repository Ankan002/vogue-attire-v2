import { atom } from "recoil";

export const menuActiveAtom = atom<boolean>({
	key: "menuActiveAtom",
	default: false,
});
