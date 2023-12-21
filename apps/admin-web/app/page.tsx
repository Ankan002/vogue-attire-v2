import { Navbar } from "@/components/common";

export default function Home() {
	return (
		<>
			<Navbar />
			<main className="flex min-h-screen flex-col items-center bg-white dark:bg-primary-dark text-primary-dark dark:text-primary-light text-xl font-oxanium mt-12">
				DEFAULT PAGE
			</main>
		</>
	);
}
