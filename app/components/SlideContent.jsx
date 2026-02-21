import React from "react";
import Image from "next/image";

export default function SlideContent({ image, title, text, excerpt, link, linkText, slug, category, showCategory, project, onOpenPopup }) {
    const handleClick = (e) => {
        if (slug && !link) return; // let link navigate
        if (onOpenPopup && project) {
            e.preventDefault();
            onOpenPopup(project);
        }
    };

    const cardClass = "flex flex-col items-stretch justify-center gap-12 min-h-[720px] rounded-md border border-[#fffdd0]/[.1] bg-gradient-to-br from-white/[.08] to-white/[.01] py-7 px-5 group transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(248,241,72,0.15)]";
    const content = (
        <>
            <div className="w-[450px] h-[450px] flex-shrink-0 overflow-hidden relative flex items-center justify-center mx-auto">
                <Image
                    width={450}
                    height={450}
                    src={`/projects/${image}`}
                    className="object-contain max-w-full max-h-full"
                    alt=""
                />
            </div>
            <div>
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="max-w-[60ch]">{excerpt}</p>
                {(slug || onOpenPopup) && (
                    <span className="inline-block border border-[#fffdd0]/50 rounded-lg px-2 py-1 mt-2 transition-all duration-300 group-hover:shadow-[0_0_10px_rgba(248,241,72,0.15)]">
                        {slug ? "Bekijk project" : "Bekijk meer"}
                    </span>
                )}
            </div>
        </>
    );

    return (
        <div className="project relative -mt-2 flex-shrink-0 w-[500px]">
            {showCategory && category && (
                <span className="absolute -top-10 left-0 text-lg font-semibold tracking-wide uppercase text-[#fffdd0]/80">
                    {category}
                </span>
            )}

            {slug && !onOpenPopup ? (
                <a href={`project/${slug}`} className={cardClass}>
                    {content}
                </a>
            ) : (
                <button
                    type="button"
                    onClick={handleClick}
                    className={`${cardClass} w-full text-left cursor-pointer`}
                >
                    {content}
                </button>
            )}
        </div>
    );
}
