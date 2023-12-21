import { atom } from "recoil";

export const adminLoadingAtom = atom<boolean>({
	key: "adminLoadingAtom",
	default: false,
});
