import Header from "./sections/Header";
import About from "./sections/About";
import Footer from "./sections/Footer";
// import ProjectsSection from "./components/projects/ProjectsSection";
import Projects from "./sections/Projects";
// import Draggable3DCarousel from "./components/projects/Draggable3DCarousel";

export default function Home() {
	return (
		<div className="flex flex-col gap-[clamp(4rem,-6.536rem_+_28.095vw,4rem)]">
			<Header />
			<About />
			<Projects />
			{/* <Draggable3DCarousel /> */}
			{/* <ProjectsSection /> */}
			<Footer />
		</div>
	);
}
