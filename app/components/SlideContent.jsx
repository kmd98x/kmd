import React from "react";

export default function SlideContent({ image, title, text, link }) {
    return (
        <>
            {link ? (
                <a href={link} className="flex flex-col items-stretch justify-between h-full rounded-md border border-white/[.1] bg-gradient-to-br from-white/[.09] to-white/[.03]">
                    <div className="w-full aspect-[4/3] overflow-hidden relative">
                        <img
                            src={`/projects/${image}`}
                            className="size-full object-cover absolute"
                            alt="Laptop"
                        />
                    </div>

                    <h3 className="font-bold text-center py-10 px-5">{title}</h3>
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

                    <h3 className="font-bold text-center py-10 px-5">{title}</h3>
                </div>
            )}
        </>
    );
}
