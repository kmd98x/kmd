import React from "react";
import ArrowRight from "./icons/ArrowRight";

export default function SlideContent({ image, title, text, link }) {
    return (
        <>
            {link ? (
                <a
                    href={link}
                    className="flex flex-col items-stretch justify-between h-full rounded-md border border-[#fffdd0]/[.1] bg-gradient-to-br from-white/[.09] to-white/[.03] group"
                >
                    <div className="w-full aspect-[4/4] overflow-hidden relative">
                        <img
                            src={`/projects/${image}`}
                            className="size-full object-contain absolute px-5"
                            alt="Laptop"
                        />
                    </div>

                    <div className="py-10 px-5">
                        <h3 className="font-bold">{title}</h3>
                        <p className="text-sm max-w-[40ch]">{text}</p>
                    </div>
                </a>
            ) : (
                <div className="flex flex-col items-stretch justify-between h-full rounded-md border border-white/[.1] bg-gradient-to-br from-white/[.09] to-white/[.03]">
                    <div className="w-full aspect-[4/4] overflow-hidden relative">
                        <img
                            src={`/projects/${image}`}
                            className="size-full object-contain absolute px-5"
                            alt="Laptop"
                        />
                    </div>

                    <div className="py-10 px-5">
                        <h3 className="font-bold">{title}</h3>
                        <p className="text-sm">{text}</p>
                    </div>
                </div>
            )}
        </>
    );
}
