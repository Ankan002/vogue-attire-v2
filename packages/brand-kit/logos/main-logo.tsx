import { AIcon, VIcon } from "../icons";

const MainLogo = () => {
	return (
		<div className="w-fit font-muli md:text-2xl text-xl text-primary-dark dark:text-primary-light flex items-center justify-center font-semibold">
			<VIcon />
			<h1 className="tracking-wider transition-none text-center">ogue</h1>
			<AIcon className="ml-1.5" />
			<h1 className="tracking-wider transition-none mt-1 text-center">ttire</h1>
		</div>
	);
};

export default MainLogo;
