import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function aboutTextAnimation(text) {
    // Split text into individual characters
    const chars = text.textContent.split("");
    
    // Clear original text and wrap each character in a span
    text.textContent = "";
    chars.forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.opacity = 0.1;
        text.appendChild(span);
    });

    // Create animation that reveals characters on scroll
    gsap.to(text.children, {
        scrollTrigger: {
            trigger: text,
            start: "top 70%",
            end: "bottom 70%",
            scrub: true,
        },
        opacity: 1,
        stagger: {
            each: 0.02,
            from: "start"
        },
        ease: "none"
    });
}