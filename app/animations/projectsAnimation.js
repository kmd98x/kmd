import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function projectsAnimation(container) {
    const projects = gsap.utils.toArray(".project");
    const projectWidth = projects[0].offsetWidth;

    gsap.to(projects, {
        xPercent: -100 * (projects.length - 1) + (projectWidth - 48),
        ease: "none",
        scrollTrigger: {
            trigger: container,
            start: "center center",
            pin: true,
            scrub: 1,
        }
    });
}