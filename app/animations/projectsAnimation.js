import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function projectsAnimation(container) {
	if (!container) return;

	const projects = gsap.utils.toArray(".project");
	if (!projects.length) return;

	const totalWidth = container.scrollWidth;
	const viewportWidth = container.getBoundingClientRect().width || window.innerWidth;

	const isSmallScreen = window.innerWidth < 768;

	// How far the row can travel horizontally (full overflow width)
	const maxTranslate = Math.max(0, totalWidth - viewportWidth);

	const targetTranslate = -maxTranslate;

	gsap.to(container, {
		x: targetTranslate,
		ease: "none",
		scrollTrigger: {
			// Use the projects row itself as both the trigger and the
			// pinned element so there is no vertical re-positioning
			// when pinning starts.
			trigger: container,
			// Start when the row's center hits the viewport center
			start: "center center",
			// Scroll distance proportional to travel distance
			end: () => `+=${isSmallScreen ? maxTranslate * 1.3 : maxTranslate}`,
			pin: container,
			pinSpacing: true,
			scrub: isSmallScreen ? 2.5 : 1,
		},
	});

	return () => ScrollTrigger.refresh();
}