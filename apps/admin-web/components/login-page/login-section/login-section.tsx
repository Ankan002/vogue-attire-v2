"use client";

import { AdminLogo } from "brand-kit/logos";
import Image from "next/image";
import LoginHeroMobile from "@/assets/images/login/login-hero-mobile.jpeg";
import { PasswordInput, TextInput } from "ui/elements";
import { useLoginSection } from "./hook";

const LoginSection = () => {
	const {
		email,
		onEmailChange,
		password,
		onPasswordChange,
		isPasswordVisible,
		togglePasswordVisible,
	} = useLoginSection();

	return (
		<div className="flex-1 flex flex-col min-h-screen px-5 py-5">
			<AdminLogo />

			<div className="w-full h-full items-center lg:justify-center justify-start mt-4 flex flex-col font-geist-sans">
				<Image
					src={LoginHeroMobile.src}
					width={LoginHeroMobile.width}
					height={LoginHeroMobile.height}
					alt="Login Hero Mobile"
					className="w-full md:max-w-[550px] max-w-[500px] md:h-40 h-32 object-cover rounded-md lg:hidden"
				/>

				<div className="w-full max-w-[450px] flex flex-col mt-4">
					<p className="text-primary-dark dark:text-primary-light text-3xl font-medium">
						Welcome Back 👋
					</p>
					<p className="text-dark-gray dark:text-secondary-gray text-lg font-base mt-3">
						You will never lose if you never give up. Let's sign in
						to change the industry.
					</p>

					{/* <Skeleton className="w-40 h-20 bg-rose-pink dark:bg-primary-red" /> */}

					<TextInput
						title="Email"
						value={email}
						onChange={onEmailChange}
						className="mt-6"
						placeholder="abc@gmail.com"
						inputClassName="tracking-wider text-base"
					/>

					<PasswordInput
						title="Password"
						value={password}
						onChange={onPasswordChange}
						className="mt-3"
						placeholder="••••••••••••"
						inputClassName="tracking-wider text-base"
						passwordVisible={isPasswordVisible}
						togglePasswordVisibility={togglePasswordVisible}
					/>
				</div>
			</div>
		</div>
	);
};

export default LoginSection;
