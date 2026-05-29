import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrubbed character reveal for a paragraph. Prefer createAboutEntranceAnimation on About.
 */
export default function aboutTextAnimation(text) {
	const chars = text.textContent.split("");
	text.textContent = "";

	chars.forEach((char) => {
		const span = document.createElement("span");
		span.textContent = char;
		span.style.opacity = "0.1";
		text.appendChild(span);
	});

	gsap.to(text.children, {
		opacity: 1,
		stagger: { each: 0.02, from: "start" },
		ease: "none",
		scrollTrigger: {
			trigger: text,
			start: "top bottom",
			end: "top 35%",
			scrub: 1,
		},
	});
}
