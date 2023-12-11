import { twMerge } from "tailwind-merge";

interface Props {
	className?: string;
}

const VIcon = (props: Props) => {
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
				d="M12.481 21.9746L20.4572 17.533L16.1583 9.8257L57.6698 10.4502L36.3799 46.0889L32.0811 38.3683L24.1048 42.8232L36.1052 64.3445L73.6223 1.55376L0.480591 0.453415L12.481 21.9746Z"
				className="fill-primary-dark dark:fill-primary-light"
			/>
		</svg>
	);
};

export default VIcon;
