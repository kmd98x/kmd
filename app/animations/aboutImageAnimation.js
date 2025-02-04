import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function aboutImageAnimation(imageContainer) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: imageContainer,
            start: "top 80%",
            end: "bottom top",
        },
    });
    
    tl.from(imageContainer, {
        width: 0,
        right: 0,
        duration: 1,
        ease: "power4.inOut",
    });
}