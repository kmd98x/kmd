import About from "@/app/sections/About";
import Footer from "@/app/sections/Footer";
import Header from "@/app/sections/Header";
import Projects from "@/app/sections/Projects";

export default function Home() {
	return (
		<div className="">
			<Header />
			<About />
			<Projects />
			<Footer />
		</div>
	);
}
