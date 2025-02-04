import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function projectsAnimation(container) {
    gsap.to(container, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
            trigger: container,
            start: "center center",
            end: "+=200%",
            pin: container,
            scrub: true,
            markers: {
                startColor: "white",
                endColor: "white"
            },
            id: 1
        }
    });
}