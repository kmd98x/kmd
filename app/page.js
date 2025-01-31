import About from "@/app/sections/About";
import Footer from "@/app/sections/Footer";
import Header from "@/app/sections/Header";
import Projects from "@/app/sections/Projects";

export default function Home() {
	return (
		<div className="flex flex-col gap-[clamp(4rem,-6.536rem_+_28.095vw,4rem)]">
			<Header />
			<About />
			<Projects />
			<Footer />
		</div>
	);
}
