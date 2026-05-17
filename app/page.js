import Header from "./sections/Header";
import About from "./sections/About";
import Footer from "./sections/Footer";
import ProjectsCarousel from "./components/projects/ProjectsCarousel";

export default function Home() {
	return (
		<div className="flex flex-col gap-[clamp(4rem,-6.536rem_+_28.095vw,4rem)]">
			<Header />
			<About />
			<ProjectsCarousel />
			<Footer />
		</div>
	);
}
