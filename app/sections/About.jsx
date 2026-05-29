"use client";

import React, { useRef, useLayoutEffect } from "react";
import { createAboutEntranceAnimation } from "../animations/aboutEntranceAnimation";

export default function About() {
    const sectionRef = useRef(null);
    const textContent = useRef(null);
    const titleRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const heroContent = document.getElementById("hero-content");
        const title = titleRef.current;
        const text = textContent.current;

        if (!section || !heroContent || !title || !text) return undefined;

        return createAboutEntranceAnimation({
            heroContent,
            aboutSection: section,
            title,
            text,
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="overflow-hidden w-full relative flex items-center justify-center will-change-transform"
        >
            <div className="max-md:-mt-32 rounded-2xl p-16 w-full flex items-center justify-center">
                <div className="mx-auto w-auto inline-block">
                    <h2 className="relative text-montez " ref={titleRef}>Over mij</h2>
                    <p className="text-[clamp(1rem,0.643rem_+_0.952vw,1.25rem)] md:max-w-[60ch] min-[1440px]:max-w-[64ch] max-md:pr-8" ref={textContent}>Ik ben Martina Doekharan, 3ᵉ jaars student Communication and Multimedia Design aan de Hogeschool van Amsterdam en ben afkomstig uit Suriname. Mijn focus ligt op visual design. Het creëren van digitale producten die niet alleen functioneel zijn, maar ook visueel overtuigen en gebruikers raken. Momenteel volg ik mijn 2e minor Visual Interface Design, waar ik mijn vaardigheden in compositie, typografie en visuele hiërarchie verder ontwikkel. Het mooiste vind ik wanneer design niet alleen goed werkt, maar ook impact maakt. Daar wil ik me tijdens mijn stage op richten.</p>
                </div>
            </div>
        </section>
    );
}

{/* 
    import Image from "next/image";
    // ====== Animations ======
    import aboutImageAnimation from "../animations/aboutImageAnimation";

    const [imageHeight, setImageHeight] = useState(0);
    
    // ====== Refs ======
    const imageContainer = useRef(null);
    const imageRef = useRef(null);

    aboutImageAnimation(imageContainer.current);

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

    <div
        className="overflow-hidden relative right-0 sm:aspect-[3/2.2] md:absolute md:top-1/2 md:-translate-y-1/2 -z-10 w-full md:max-w-xl xl:max-w-[800px] min-[1440px]:max-w-[1100px]"
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
*/}