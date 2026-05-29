import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import split from "../utils/split";

gsap.registerPlugin(ScrollTrigger);

/** Last fraction of header scrub where opacity goes 1 → 0 (smaller = faster fade) */
const HERO_FADE_PORTION = 0.08;

function wrapTextChars(textEl) {
	const chars = textEl.textContent.split("");
	textEl.textContent = "";
	const spans = [];

	chars.forEach((char) => {
		const span = document.createElement("span");
		span.textContent = char;
		span.style.opacity = "0.1";
		textEl.appendChild(span);
		spans.push(span);
	});

	return spans;
}

/**
 * Header: scrubbed zoom through #home; opacity stays 1 until near the end, then 0.
 * About: scrubbed title + body text only (no section slide).
 */
export function createAboutEntranceAnimation({
	heroContent,
	aboutSection,
	title,
	text,
	heroHeader = typeof document !== "undefined"
		? document.getElementById("home")
		: null,
}) {
	const titleChars = split(title);
	const textChars = wrapTextChars(text);

	gsap.set(heroContent, { opacity: 1, scale: 1 });
	gsap.set(titleChars, { opacity: 0 });

	let heroScrubTl = null;

	if (heroHeader) {
		const fadeStart = 1 - HERO_FADE_PORTION;

		heroScrubTl = gsap
			.timeline({
				scrollTrigger: {
					trigger: heroHeader,
					start: "top top",
					end: "bottom 50%",
					scrub: 1,
				},
			})
			.fromTo(
				heroContent,
				{ opacity: 1, scale: 1 },
				{ opacity: 0, scale: 1.08, ease: "none", duration: fadeStart },
				0
			)
			.to(
				heroContent,
				{ opacity: 0, scale: 1.08, ease: "none", duration: HERO_FADE_PORTION },
				fadeStart
			);
	}

	const aboutScrubTl = gsap
		.timeline({
			scrollTrigger: {
				trigger: aboutSection,
				start: "top bottom",
				end: "top 35%",
				scrub: 1,
			},
		})
		.to(
			titleChars,
			{
				opacity: 1,
				stagger: 0.05,
				ease: "none",
			},
			0
		)
		.to(
			textChars,
			{
				opacity: 1,
				stagger: { each: 0.02, from: "start" },
				ease: "none",
			},
			0.2
		);

	ScrollTrigger.refresh();

	return () => {
		heroScrubTl?.scrollTrigger?.kill();
		heroScrubTl?.kill();
		aboutScrubTl.scrollTrigger?.kill();
		aboutScrubTl.kill();
		gsap.set(heroContent, { clearProps: "opacity,transform" });
		gsap.set(titleChars, { clearProps: "opacity,transform" });
		gsap.set(textChars, { clearProps: "opacity" });
	};
}
