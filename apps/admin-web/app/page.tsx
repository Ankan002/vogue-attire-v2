export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-primary-dark text-primary-dark dark:text-primary-light text-xl font-oxanium">
			{process.env["NAME"]} DEFAULT PAGE
		</main>
	);
}
