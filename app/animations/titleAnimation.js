import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import split from "../utils/split";

export default function titleAnimation(title) {
    const theTitle = split(title)

    console.log(theTitle)

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "bottom bottom",
        },
    });

    tl.from(theTitle, {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        ease: "power4.inOut",
    })
}