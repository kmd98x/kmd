"use client";

import React from "react";
import Image from "next/image";
import MartinaDoekharan from "../components/MartinaDoekharan";
import { createHeaderHeroScroll } from "../animations/headerHeroScroll";

const SCROLL_RELEASE_PX = 648;

export default function Header() {
    const heroShellRef = React.useRef(null);

    React.useLayoutEffect(() => {
        const shell = heroShellRef.current;
        if (!shell) return undefined;
        return createHeaderHeroScroll(shell, { releasePx: SCROLL_RELEASE_PX });
    }, []);

    const portfolioTypography = "text-var(--font-inter) text-8xl font-extrabold leading-none mx-[1px]";
    const portfolioOffset = "relative -top-40 left-2";
    const portfolioStyling = `${portfolioTypography} ${portfolioOffset} text-[var(--color-dark-gold)]`;
    const folLetterStack = `${portfolioTypography} ${portfolioOffset} inline-grid`;
    const folLetterFilled = `${portfolioTypography} col-start-1 row-start-1 z-0 text-[var(--color-dark-gold)]`;
    const folLetterOutline = `${portfolioTypography} col-start-1 row-start-1 z-20 text-outline`;

    const folLetters = ["F", "O", "L"];

    return (
        <header id="home" className="relative h-screen w-screen overflow-x-hidden">
            <div
                ref={heroShellRef}
                className="-z-10 w-full flex justify-center pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <div
                    id="hero-content"
                    className="relative flex justify-center items-center scale-[clamp(1,calc(0.875+0.75vw),1.25)] pointer-events-auto will-change-transform"
                >
                    <div className="absolute">
                        <span className={portfolioStyling}>P</span>
                        <span className={portfolioStyling}>O</span>
                        <span className={portfolioStyling}>R</span>
                        <span className={portfolioStyling}>T</span>
                        {folLetters.map((letter) => (
                            <span key={letter} className={folLetterStack}>
                                <span className={folLetterFilled} aria-hidden>{letter}</span>
                                <span className={folLetterOutline}>{letter}</span>
                            </span>
                        ))}
                        <span className={portfolioStyling}>I</span>
                        <span className={portfolioStyling}>O</span>

                        <Image
                            src="/sitting-martina.svg"
                            className="absolute w-[280px] bottom-[-60px] left-[176px] z-10"
                            alt="martina zit op een stoel en poseert"
                            width={100}
                            height={100}
                        />
                    </div>

                    <MartinaDoekharan className="w-full z-10" />
                </div>
            </div>
        </header>
    );
}
