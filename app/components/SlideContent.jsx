import React from "react";
import ArrowRight from "./icons/ArrowRight";

export default function SlideContent({ image, title, text, link }) {
    return (
        <>
            {link ? (
                <a
                    href={link}
                    className="flex flex-col items-stretch justify-between h-full rounded-md border border-white/[.1] bg-gradient-to-br from-white/[.09] to-white/[.03] group"
                >
                    <div className="w-full aspect-[4/3] overflow-hidden relative">
                        <img
                            src={`/projects/${image}`}
                            className="size-full object-cover absolute"
                            alt="Laptop"
                        />
                    </div>

                    <div className="flex items-end justify-between gap-5 py-10 px-5">
                        <div className="">
                            <h3 className="font-bold">{title}</h3>
                            <p className="text-sm max-w-[40ch]">{text}</p>
                        </div>

                        <div className="w-12 h-12 bg-[#fffdd0] rounded-full flex items-center justify-center group-hover:-rotate-45 transition duration-300 flex-shrink-0">
                            <ArrowRight />
                        </div>
                    </div>
                </a>
            ) : (
                <div className="flex flex-col items-stretch justify-between h-full rounded-md border border-white/[.1] bg-gradient-to-br from-white/[.09] to-white/[.03]">
                    <div className="w-full aspect-[4/3] overflow-hidden relative">
                        <img
                            src={`/projects/${image}`}
                            className="size-full object-cover absolute"
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
