import React from "react";

export default function Header() {
    return (
        <header>
            <div className="header-container">
                <div className="menu-icon"></div>
                <div className="language-toggle">NL</div>
            </div>
            <div className="logo-container">
                <img
                    className="mx-auto inline-block"
                    src="/telefoonlogo.svg"
                    alt="logo"
                />
            </div>
        </header>
    );
}
