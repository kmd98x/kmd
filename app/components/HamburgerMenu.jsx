import React from "react";

export default function hamburgermenu({ links, isOpen, setIsOpen }) {
    const linkStyles = "text-[#FFFDD0] inline-block p-5";

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();

        setIsOpen(false);

        const element = document.getElementById(sectionId);
		
        if (element) {
            element.scrollIntoView({ behavior: "smooth", duration: 4000 });
        }
    };

    return (
        <nav
            className={`fixed size-full bg-black/50 backdrop-blur transition-all duration-1000 z-20 top-0 ${
                isOpen
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0 "
            }`}
        >
            <ul className="pt-10">
                <li>
                    <a
                        className={linkStyles}
                        onClick={(e) => scrollToSection(e, "home")}
                        href="#home"
                    >
                        {links[0]}
                    </a>
                </li>
                <li>
                    <a
                        className={linkStyles}
                        onClick={(e) => scrollToSection(e, "about")}
                        href="#about"
                    >
                        {links[1]}
                    </a>
                </li>
                <li>
                    <a
                        className={linkStyles}
                        onClick={(e) => scrollToSection(e, "projects")}
                        href="#projects"
                    >
                        {links[2]}
                    </a>
                </li>
                <li>
                    <a
                        className={linkStyles}
                        onClick={(e) => scrollToSection(e, "footer")}
                        href="#footer"
                    >
                        {links[3]}
                    </a>
                </li>
            </ul>
        </nav>
    );
}
