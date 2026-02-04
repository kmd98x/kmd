"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Image from "next/image";

// Animations
import aboutImageAnimation from "../animations/aboutImageAnimation";
import titleAnimation from "../animations/titleAnimation";
import aboutTextAnimation from "../animations/aboutTextAnimation";

export default function About() {
    // Refs
    const imageContainer = useRef(null);
    const imageRef = useRef(null);
    const textContainer = useRef(null);
    const textContent = useRef(null);
    const titleRef = useRef(null);
    
    const [imageHeight, setImageHeight] = useState(0);

    useEffect(() => {
        if (imageRef.current) {
            setImageHeight(imageRef.current.clientHeight);
        }
    }, []);

    if (imageContainer.current) {
        gsap.set(imageContainer.current, {
            height: imageHeight,
        });
    }

    useEffect(() => {
        aboutImageAnimation(imageContainer.current);
        titleAnimation(titleRef.current);
        aboutTextAnimation(textContent.current);
    }, []);

    return (
        <section
            id="about"
            className="overflow-hidden container !pr-0 md:flex md:flex-row md:items-center md:py-32 relative md:h-screen"
        >
            <div
                className="overflow-hidden relative right-0 aspect-[3/2.2] md:absolute md:top-1/2 md:-translate-y-1/2 -z-10 w-full md:max-w-3xl"
                ref={imageContainer}
            >
                <Image
                    width={768}
                    height={563}
                    className="size-full object-cover"
                    src="/bewerktefoto2.png"
                    ref={imageRef}
                    alt="foto van KMD"
                />
            </div>

            <div className="max-md:-mt-32" ref={textContainer}>
                <h2 className="relative text-montez" ref={titleRef}>Over mij</h2>
                <p className="text-[clamp(1rem,0.643rem_+_0.952vw,1.25rem)] md:max-w-[60ch] max-md:pr-8" ref={textContent}>
                Ik ben Martina Doekharan, 3ᵉ jaars student Communication and Multimedia Design aan de Hogeschool van Amsterdam en ben afkomstig uit Suriname. Mijn focus ligt op visual design. Het creëren van digitale producten die niet alleen functioneel zijn, maar ook visueel overtuigen en gebruikers raken.
                Momenteel volg ik mijn 2e minor Visual Interface Design, waar ik mijn vaardigheden in compositie, typografie en visuele hiërarchie verder ontwikkel. Het mooiste vind ik wanneer design niet alleen goed werkt, maar ook impact maakt. Daar wil ik me tijdens mijn stage op richten.
                </p>
            </div>
        </section>
    );
}
