import React from "react";

export default function SlideContent({ image, title, text, link }) {
    return (
        <div className="project flex-shrink-0 w-[clamp(18rem,14.429rem_+_9.524vw,23rem)] aspect-[4/5.5]">
            {link ? (
                <a
                    href={link}
                    className="flex flex-col items-stretch justify-center gap-12 h-full rounded-md border border-[#fffdd0]/[.1] bg-gradient-to-br from-white/[.08] to-white/[.01] py-7 px-5"
                >
                    <div className="w-full aspect-[4/4] overflow-hidden relative">
                        <img
                            src={`/projects/${image}`}
                            className="size-full object-contain absolute"
                            alt="Laptop"
                        />
                    </div>

                    <div>
                        <h3 className="font-bold">{title}</h3>
                        <p className="text-sm max-w-[40ch]">{text}</p>

                        <span className="inline-block border border-[#fffdd0]/50 rounded-lg px-2 py-1 mt-2">Bekijk project</span>
                    </div>
                </a>
            ) : (
                <div className="flex flex-col items-stretch justify-between h-full rounded-md border border-white/[.1] bg-gradient-to-br from-white/[.08] to-white/[.01] py-7 px-5">
                    <div className="w-full aspect-[4/4] overflow-hidden relative">
                        <img
                            src={`/projects/${image}`}
                            className="size-full object-contain absolute px-5"
                            alt="Laptop"
                        />
                    </div>

                    <div>
                        <h3 className="font-bold">{title}</h3>
                        <p className="text-sm">{text}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
