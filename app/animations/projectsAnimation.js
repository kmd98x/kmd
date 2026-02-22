import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function projectsAnimation(container) {
	if (!container) return;

	const projects = gsap.utils.toArray(".project");
	if (!projects.length) return;

	const totalWidth = container.scrollWidth;
	const viewportWidth = window.innerWidth;

	// Only slide enough so the last card is in view; don't slide all the way left
	const extraRightSpace = 520;

	const maxTranslate = Math.max(0, totalWidth - viewportWidth + extraRightSpace);

	gsap.to(container, {
		x: -maxTranslate,
		ease: "none",
		scrollTrigger: {
			trigger: container,
			start: "45% 60%",
			end: () => `+=${window.innerHeight * 1.5 - 1010}`,
			pin: true,
			pinSpacing: true,
			scrub: 1,
		},
	});

	return () => ScrollTrigger.refresh();
}