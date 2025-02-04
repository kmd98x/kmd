import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function projectsAnimation(container) {

    const containerWidth = container.offsetWidth;

    gsap.to(container, {
        xPercent: -(((containerWidth / window.innerWidth) * 100) + 34.5),
        ease: "none",
        scrollTrigger: {
            trigger: container,
            start: "center center",
            end: `${containerWidth}px`,
            pin: true,
            scrub: 0.1,
        }
    });
}