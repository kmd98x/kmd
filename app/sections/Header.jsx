"use client"
import React from "react";
import HamburgerMenu from "../components/HamburgerMenu";

export default function Header() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header id="home">
            <HamburgerMenu isOpen={isOpen} links={["Home", "Over mij", "Projecten", "Contact"]} setIsOpen={setIsOpen} />
            
            <div className="fixed right-0 flex flex-col justify-center items-center gap-4 px-3 z-30">
                <div className="flex flex-col gap-1.5 border border-[#FFFDD0]/50 py-2 w-12 rounded-md items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}>
                    <span className={`bg-[#FFFDD0]/50 h-px w-5 inline-block transition-transform duration-1000 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}></span>
                    <span className={`bg-[#FFFDD0]/50 h-px inline-block transition duration-1000 ${isOpen ? "w-0" : "w-5"}`}></span>
                    <span className={`bg-[#FFFDD0]/50 h-px w-5 inline-block transition-transform duration-1000 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`}></span>
                </div>
                
                <div className={`border border-[#FFFDD0]/50 duration-1000 py-1.5 w-12 transition rounded-md text-sm text-[#FFFDD0]/50 ${isOpen ? "opacity-0" : ""}`}>NL</div>
            </div>

            <div className="my-auto">
                <img
                    className="mx-auto inline-block h-auto translate-y-[50px] w-[clamp(13.5rem,-24.375rem_+_101vw,30rem)]"
                    src="/logo-desktop.svg"
                    alt="logo"
                />
            </div>
        </header>
    );
}
