"use client"
import React from "react";
import HamburgerMenu from "../components/HamburgerMenu";
import Image from "next/image";
import MartinaDoekharan from "../components/MartinaDoekharan";

export default function Header() {
    const [isOpen, setIsOpen] = React.useState(false);

    const portfolioTypography = "text-var(--font-inter) text-8xl font-extrabold leading-none mx-[1px]";
    const portfolioOffset = "relative -top-40 left-2";
    const portfolioStyling = `${portfolioTypography} ${portfolioOffset} text-[var(--color-dark-gold)]`;
    const folLetterStack = `${portfolioTypography} ${portfolioOffset} inline-grid`;
    const folLetterFilled = `${portfolioTypography} col-start-1 row-start-1 z-0 text-[var(--color-dark-gold)]`;
    const folLetterOutline = `${portfolioTypography} col-start-1 row-start-1 z-20 text-outline`;

    const folLetters = ["F", "O", "L"];

    return (
        <header id="home" className="overflow-x-hidden">
            <HamburgerMenu isOpen={isOpen} links={["Home", "Over mij", "Projecten", "Contact"]} setIsOpen={setIsOpen} />

            <div className="fixed right-0 flex flex-col justify-center items-center gap-4 px-3 z-30">
                <div className="flex flex-col gap-1.5 border border-[#FFFDD0]/50 py-2 w-12 rounded-md items-center justify-center transition duration-300 hover:scale-110 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}>
                    <span className={`bg-[#FFFDD0]/50 h-px w-5 inline-block transition-transform duration-1000 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}></span>
                    <span className={`bg-[#FFFDD0]/50 h-px inline-block transition duration-1000 ${isOpen ? "w-0" : "w-5"}`}></span>
                    <span className={`bg-[#FFFDD0]/50 h-px w-5 inline-block transition-transform duration-1000 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`}></span>
                </div>
            </div>

            <div className="my-auto flex justify-center items-center relative scale-[clamp(1,calc(0.875+0.75vw),1.25)]">
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

                    <Image src="/sitting-martina.svg" className="absolute w-[280px] bottom-[-60px] left-[176px] z-10" alt="martina zit op een stoel en poseert" width={100} height={100} />
                </div>

                <MartinaDoekharan className="w-full z-10" />

            </div>
        </header>
    );
}
