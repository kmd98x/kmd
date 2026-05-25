import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DURATION = 1.2;

/**
 * Scroll from header into about: hero fades out and scales up slightly;
 * about section slides up. Plays on scroll down, reverses on scroll up.
 *
 * @param {HTMLElement} heroContent - Inner hero wrapper (not the positioning shell)
 * @param {HTMLElement} aboutSection - #about section element
 * @returns {() => void} Cleanup
 */
export function createHeaderToAboutTransition(heroContent, aboutSection) {
	gsap.set(heroContent, { opacity: 1, scale: 1 });
	gsap.set(aboutSection, { y: "12vh" });

	const tl = gsap.timeline({
		paused: true,
		scrollTrigger: {
			trigger: aboutSection,
			start: "top bottom",
			toggleActions: "play none none reverse",
		},
	});

	tl.to(
		heroContent,
		{
			opacity: 0,
			scale: 1.08,
			duration: DURATION,
			ease: "power2.inOut",
		},
		0
	).to(
		aboutSection,
		{
			y: 0,
			duration: DURATION,
			ease: "power2.inOut",
		},
		0
	);

	return () => {
		tl.scrollTrigger?.kill();
		tl.kill();
		gsap.set(heroContent, { clearProps: "opacity,transform" });
		gsap.set(aboutSection, { clearProps: "transform" });
	};
}
