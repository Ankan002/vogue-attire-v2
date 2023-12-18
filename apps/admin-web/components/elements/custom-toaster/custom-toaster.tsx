"use client";

import { themeAtom } from "@/atoms";
import { Toaster, ToastBar } from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { Theme } from "types/common";
import { colors } from "tailwind-config/colors";

const CustomToaster = () => {
	const currentTheme = useRecoilValue<Theme>(themeAtom);

	return (
		<Toaster
			toastOptions={{
				success: {
					iconTheme: {
						primary: colors["primary-green"],
						secondary:
							currentTheme === "dark"
								? colors["primary-dark"]
								: colors["primary-light"],
					},
				},
				error: {
					iconTheme: {
						primary: colors["primary-red"],
						secondary:
							currentTheme === "dark"
								? colors["primary-dark"]
								: colors["primary-light"],
					},
				},
				duration: 1500,
			}}
		>
			{(t) => (
				<ToastBar
					toast={t}
					style={{
						...t.style,
						fontFamily: "'muli', sans-serif",
						backgroundColor:
							currentTheme === "dark"
								? colors["primary-dark"]
								: colors["primary-light"],
						color:
							currentTheme === "dark"
								? colors["primary-light"]
								: colors["primary-dark"],
						border:
							currentTheme === "dark"
								? `1px solid ${colors["primary-light"]}`
								: `1px solid ${colors["primary-dark"]}`,
					}}
				/>
			)}
		</Toaster>
	);
};

export default CustomToaster;
