import { atom } from "recoil";
import { Theme } from "types/common";

export const themeAtom = atom<Theme>({
	key: "themeAtom",
	default: "light",
});
