import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/**
 * Animates the projects track to slide to the left on scroll.
 * Calls onProgress(0–1) as the user scrolls so the years can show progress.
 *
 * @param {HTMLElement} section - Section to pin and use as ScrollTrigger
 * @param {HTMLElement} viewport - The overflow-hidden wrapper (for measuring width)
 * @param {HTMLElement} track - The flex row of projects (animated element)
 * @param {(progress: number) => void} [onProgress] - Called with 0–1 as user scrolls
 * @returns {() => void} Cleanup function
 */
export default function projectsAnimation(section, viewport, track, onProgress) {
    if (!section || !viewport || !track) return () => {};

    const scrollDistance = Math.max(0, track.scrollWidth - viewport.offsetWidth);
    if (scrollDistance <= 0) {
        onProgress?.(1);
        return () => {};
    }

    const endX = -scrollDistance;
    const tween = gsap.to(track, {
        x: endX,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            markers: true,
            start: "center center",
            end: `+=${scrollDistance}`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => onProgress?.(self.progress),
            onLeave: () => onProgress?.(1),
            onLeaveBack: () => onProgress?.(0),
        },
    });

    return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
    };
}