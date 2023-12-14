"use client";

import { twMerge } from "tailwind-merge";

interface Props {
	title: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	titleClassName?: string;
	inputClassName?: string;
	placeholder?: string;
}

const TextInput = (props: Props) => {
	const {
		title,
		value,
		onChange,
		className,
		inputClassName,
		titleClassName,
		placeholder,
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

			<input
				value={value}
				onChange={onChange}
				className={twMerge(
					"mt-1 bg-tertiary-light dark:bg-secondary-dark border border-dark-gray/80 rounded-lg px-3 py-1 text-lg outline-none placeholder:font-geist-sans placeholder:text-dark-gray text-primary-dark dark:text-primary-light focus:border-secondary-dark dark:focus:border-primary-light",
					inputClassName,
				)}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default TextInput;
