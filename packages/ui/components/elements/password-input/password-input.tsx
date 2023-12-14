"use client";

import { twMerge } from "tailwind-merge";
import { Eye, EyeOff } from "lucide-react";

interface Props {
	title: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	passwordVisible: boolean;
	togglePasswordVisibility: () => void;
	className?: string;
	titleClassName?: string;
	inputClassName?: string;
	placeholder?: string;
	logoSize?: number;
}

const PasswordInput = (props: Props) => {
	const {
		title,
		value,
		onChange,
		className,
		inputClassName,
		titleClassName,
		placeholder,
		passwordVisible,
		logoSize,
		togglePasswordVisibility,
	} = props;

	return (
		<div
			className={twMerge(
				"w-full flex font-geist-sans flex-col",
				className,
			)}
		>
			<p
				className={twMerge(
					"text-base text-primary-dark dark:text-primary-light",
					titleClassName,
				)}
			>
				{title}
			</p>

			<div className="flex w-full relative items-center transition-none mt-1">
				<input
					value={value}
					onChange={onChange}
					className={twMerge(
						"bg-tertiary-light dark:bg-secondary-dark border border-dark-gray/80 rounded-lg pl-3 pr-9 py-1 text-lg outline-none placeholder:font-geist-sans placeholder:text-dark-gray text-primary-dark dark:text-primary-light focus:border-secondary-dark dark:focus:border-primary-light w-full",
						inputClassName,
					)}
					placeholder={placeholder}
					type={passwordVisible ? "text" : "password"}
				/>
				<button
					className="absolute  right-3 text-primary-dark dark:text-primary-light text-center transition-none"
					onClick={togglePasswordVisibility}
					aria-label="toggle password visibility"
				>
					{passwordVisible ? (
						<EyeOff
							className="transition-none"
							size={logoSize ?? 17}
						/>
					) : (
						<Eye
							className="transition-none"
							size={logoSize ?? 17}
						/>
					)}
				</button>
			</div>
		</div>
	);
};

export default PasswordInput;
