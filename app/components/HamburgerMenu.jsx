import React from "react";

const SECTION_IDS = ["home", "about", "projects", "footer"];

export default function HamburgerMenu({ links, isOpen, onNavigate }) {
    const linkStyles = "text-[#FFFDD0] inline-block p-3 md:p-5 text-[12px] md:text-base";

    return (
        <nav
            className={`fixed size-full bg-black/50 backdrop-blur transition-all duration-1000 z-20 top-0 flex items-center justify-center ${
                isOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0 "
            }`}
        >
            <ul className="pt-10">
                {links.map((label, index) => (
                    <li key={SECTION_IDS[index]}>
                        <a
                            className={linkStyles}
                            onClick={(e) => onNavigate(e, SECTION_IDS[index])}
                            href={`#${SECTION_IDS[index]}`}
                        >
                            {label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
