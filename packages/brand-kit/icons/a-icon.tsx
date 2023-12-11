import { twMerge } from "tailwind-merge";

interface Props {
	className?: string;
}

const AIcon = (props: Props) => {
	const { className } = props;

	return (
		<svg
			width="26"
			height="32"
			viewBox="0 0 74 64"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={twMerge("w-7 h-6", className)}
		>
			<path
				d="M24.6397 63.4551L24.5592 54.326L15.7344 54.4101L36.1577 18.2647L57.2529 54.019L48.4165 54.0965L48.5087 63.2321L73.1486 63.0006L35.985 -5.44418e-06L0 63.6868L24.6397 63.4551Z"
				className="fill-primary-dark dark:fill-primary-light"
			/>
		</svg>
	);
};

export default AIcon;
