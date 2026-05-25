import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero stays fixed and viewport-centered until scroll reaches releasePx,
 * then switches to absolute at the same visual position so it scrolls with the page.
 *
 * @param {HTMLElement} heroShell - Wrapper that only handles position/centering
 * @param {{ releasePx?: number }} [options]
 * @returns {() => void} Cleanup (kill trigger, clear inline props GSAP set)
 */
export function createHeaderHeroScroll(heroShell, options = {}) {
	const releasePx = options.releasePx ?? 648;

	const setFixed = () => {
		gsap.set(heroShell, {
			position: "fixed",
			top: "50%",
			left: "50%",
			xPercent: -50,
			yPercent: -50,
		});
	};

	const setReleased = () => {
		gsap.set(heroShell, {
			position: "absolute",
			top: `calc(${releasePx}px + 50vh)`,
			left: "50%",
			xPercent: -50,
			yPercent: -50,
		});
	};

	const sync = () => {
		// window is the scroller; ScrollTrigger has no static scroll() helper in v3
		const y = window.scrollY;
		if (y >= releasePx) {
			setReleased();
		} else {
			setFixed();
		}
	};

	sync();

	const st = ScrollTrigger.create({
		start: 0,
		end: "max",
		onUpdate: sync,
	});

	return () => {
		st.kill();
		gsap.set(heroShell, {
			clearProps: "position,top,left,transform",
		});
	};
}
