import React from "react";

export default function SlideContent({ image, title, text, link}) {
    return (
        <div className="flex flex-col items-stretch justify-end h-full">
            <img
                src={`/projects/${image}`}
                className="absolute -z-10 size-full object-cover"
                alt="Laptop"
            />

            <div className="h-3/4 relative mt-auto mb-0 size-full bg-gradient-to-t from-black flex flex-col items-start justify-end gap-1 p-5 hover:opacity-0 duration-500 transition-opacity">
                <h3 className="font-bold">{title}</h3>
                <p>
                    {text}
                </p>
                {link && <a href={link} className="mt-2 border border-[#FFFDD0] p-1.5 px-3 transition rounded-md text-sm text-[#FFFDD0]">Bekijk project</a>}
            </div>
        </div>
    );
}
