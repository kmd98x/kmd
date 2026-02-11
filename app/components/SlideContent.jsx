import React from "react";
import Image from "next/image";

export default function SlideContent({ image, title, text, link }) {
    return (
        <div className="project flex-shrink-0 w-[clamp(18rem,14.429rem_+_9.524vw,23rem)] aspect-[4/5.5]">
            {link ? (
                <a
                    href={link}
                    target="_blank"
                    className="flex flex-col items-stretch justify-center gap-12 h-full rounded-md border border-[#fffdd0]/[.1] bg-gradient-to-br from-white/[.08] to-white/[.01] py-7 px-5 group transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(248,241,72,0.15)]"
                >
                    <div className="w-full aspect-[4/4] overflow-hidden relative">
                        <Image
                            width={326}
                            height={290}
                            src={`/projects/${image}`}
                            className="size-full object-contain absolute"
                            alt="Laptop"
                        />
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-1">{title}</h3>
                        <p className="max-w-[40ch]">{text}</p>

                        <span className="inline-block border border-[#fffdd0]/50 rounded-lg px-2 py-1 mt-2 transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(248,241,72,0.15)]">Bekijk project</span>
                    </div>
                </a>
            ) : (
                <div className="flex flex-col items-stretch justify-between h-full rounded-md border border-white/[.1] bg-gradient-to-br from-white/[.08] to-white/[.01] py-7 px-5 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(248,241,72,0.15)]">
                    <div className="w-full aspect-[4/4] overflow-hidden relative">
                        <Image
                            width={326}
                            height={290}
                            src={`/projects/${image}`}
                            className="size-full object-contain absolute px-5"
                            alt="Laptop"
                        />
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-1">{title}</h3>
                        <p className="max-w-[40ch]">{text}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
