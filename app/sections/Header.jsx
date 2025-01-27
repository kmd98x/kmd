import React from "react";

export default function Header() {
    return (
        <header>
            <div className="flex flex-col items-end gap-4 px-3">
                <div className="flex flex-col gap-1.5 border border-[#FFFDD0]/50 py-2 w-12 rounded-md items-center justify-center">
                    <span className="bg-[#FFFDD0]/50 h-px w-5 inline-block"></span>
                    <span className="bg-[#FFFDD0]/50 h-px w-5 inline-block"></span>
                    <span className="bg-[#FFFDD0]/50 h-px w-5 inline-block"></span>
                    
                </div>
                <div className="border border-[#FFFDD0]/50 py-1.5 w-12 rounded-md text-sm text-[#FFFDD0]/50">NL</div>
            </div>
            <div className="logo-container mb-80">
                <img
                    className="mx-auto inline-block"
                    src="/groterelogo.svg"
                    alt="logo"
                />
            </div>
        </header>
    );
}
