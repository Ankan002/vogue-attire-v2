"use client";

import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface SolidButtonCoreProps {
	title: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
	textClassName?: string;
	LeftIcon?: IconType;
	leftIconSize?: number;
	leftIconClassName?: string;
	RightIcon?: IconType;
	rightIconSize?: number;
	rightIconClassName?: string;
}

const SolidButtonCore = (props: SolidButtonCoreProps) => {
	const {
		title,
		className,
		textClassName,
		onClick,
		LeftIcon,
		leftIconSize,
		leftIconClassName,
		RightIcon,
		rightIconClassName,
		rightIconSize,
	} = props;

	return (
		<button
			className={twMerge(
				"w-full flex items-center justify-center px-3 py-1.5 font-geist-sans bg-primary-dark dark:bg-primary-light hover:bg-primary-dark/80 dark:hover:bg-primary-light/80 text-primary-light dark:text-primary-dark rounded-lg",
				className,
			)}
			aria-label={`${title} button`}
			onClick={onClick}
		>
			{RightIcon && (
				<RightIcon
					size={rightIconSize ?? 20}
					className={twMerge(
						"mr-2 transition-none",
						rightIconClassName,
					)}
				/>
			)}

			<p className={twMerge("text-base transition-none", textClassName)}>{title}</p>

			{LeftIcon && (
				<LeftIcon
					size={leftIconSize ?? 20}
					className={twMerge(
						"ml-2 transition-none",
						leftIconClassName,
					)}
				/>
			)}
		</button>
	);
};

type Props = SolidButtonCoreProps & {
	link?: string;
	type?: "internal" | "external";
};

const SolidButton = (props: Props) => {
	const { link, type } = props;

	return (
		<>
			{link ? (
				<>
					{type === "internal" ? (
						<Link href={link}>
							<SolidButtonCore {...props} />
						</Link>
					) : (
						<a href={link} target="_blank">
							<SolidButtonCore {...props} />
						</a>
					)}
				</>
			) : (
				<SolidButtonCore {...props} />
			)}
		</>
	);
};

export default SolidButton;
