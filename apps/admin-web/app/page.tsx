import { Navbar, Sidebar } from "@/components/common";
import { HomePage } from "@/components/home-page";

export default function Home() {
	return (
		<>
			<Navbar />
			<Sidebar />
			<main>
				<HomePage />
			</main>
		</>
	);
}
