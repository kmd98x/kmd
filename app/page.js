import About from "@/app/sections/About";
import Footer from "@/app/sections/Footer";
import Projects from "@/app/sections/Projects";
import NewProjects from "@/app/sections/NewProjects";

export default function Home() {
	return (
		<div className="flex flex-col gap-[clamp(4rem,-6.536rem_+_28.095vw,4rem)]">
			<About />
			{/* <Projects /> */}
			<NewProjects />
			<Footer />
		</div>
	);
}
