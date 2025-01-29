import React from "react";

export default function SlideContent({ image, title, text, link}) {
    return (
        <div className="flex flex-col items-stretch justify-between h-full rounded-md bg-gradient-to-br from-white/20 to-white/5">
            <div className="w-full aspect-[4/3] overflow-hidden relative">
                <img
                    src={`/projects/${image}`}
                    className="size-full object-cover absolute"
                    alt="Laptop"
                />
            </div>

            <div className="flex flex-col items-start justify-end gap-1 py-10 px-5 duration-500 transition-opacity">
                <h3 className="font-bold">{title}</h3>
                {/* <p>
                    {text}
                </p> */}
                {link && 
                    <a href={link} className="mt-2 border border-[#FFFDD0] p-1.5 px-3 transition rounded-md text-sm text-[#FFFDD0]">Bekijk project</a>
                }
            </div>
        </div>
    );
}
