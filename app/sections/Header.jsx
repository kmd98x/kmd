"use client";

import React from "react";
import Navigation from "../components/Navigation";
export default function Header() {

    return (
        <header id="home">
            <Navigation />

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
