"use client"
import React from "react";
import HamburgerMenu from "../components/HamburgerMenu";
export default function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <header id="home">
            <HamburgerMenu isOpen={isOpen} links={["Home", "Over mij", "Projecten", "Contact"]} />   
            <div className="fixed right-0 flex flex-col justify-center items-center gap-4 px-3 z-30">
                <div className="flex flex-col gap-1.5 border border-[#FFFDD0]/50 py-2 w-12 rounded-md items-center justify-center"
                onClick={() => setIsOpen(!isOpen)}>
                    <span className="bg-[#FFFDD0]/50 h-px w-5 inline-block"></span>
                    <span className="bg-[#FFFDD0]/50 h-px w-5 inline-block"></span>
                    <span className="bg-[#FFFDD0]/50 h-px w-5 inline-block"></span>
                    
                </div>
                <div className="border border-[#FFFDD0]/50 py-1.5 w-12 rounded-md text-sm text-[#FFFDD0]/50">NL</div>
            </div>
            <div className="my-auto">
                <img
                    className="mx-auto inline-block"
                    src="/groterelogo.svg"
                    alt="logo"
                />
            </div>
        </header>
    );
}
