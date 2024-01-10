import { AssetsPage } from "@/components/assets-page";
import { Navbar, Sidebar } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Vogue Attire Admin | Assets",
};

const Page = () => {
	return (
		<>
			<Navbar />
			<Sidebar />
			<main>
				<AssetsPage />
			</main>
		</>
	);
};

export default Page;
