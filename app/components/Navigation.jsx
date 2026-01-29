"use client"

import React from 'react'
import HamburgerMenu from './HamburgerMenu'

export default function Navigation() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <HamburgerMenu isOpen={isOpen} links={["Home", "Over mij", "Projecten", "Contact"]} setIsOpen={setIsOpen} />
                
                <div className="fixed right-0 flex flex-col justify-center items-center gap-4 px-3 z-30">
                    <div className="flex flex-col gap-1.5 border border-[#FFFDD0]/50 py-2 w-12 rounded-md items-center justify-center transition duration-300 hover:scale-110 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}>
                        <span className={`bg-[#FFFDD0]/50 h-px w-5 inline-block transition-transform duration-1000 ${isOpen ? "translate-y-[7px] rotate-45" : ""}`}></span>
                        <span className={`bg-[#FFFDD0]/50 h-px inline-block transition duration-1000 ${isOpen ? "w-0" : "w-5"}`}></span>
                        <span className={`bg-[#FFFDD0]/50 h-px w-5 inline-block transition-transform duration-1000 ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`}></span>
                    </div>
                </div>
        </>
    )
}
