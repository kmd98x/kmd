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

    const cardClass = "flex flex-col items-stretch justify-between gap-12 min-h-[550px] rounded-md border border-[#fffdd0]/[.1] bg-gradient-to-br from-white/[.08] to-white/[.01] py-7 px-5 group transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(248,241,72,0.15)]";
    const content = (
        <>
            <div className="w-[300px] h-[300px] 2xl:w-[450px] 2xl:h-[450px] flex-shrink-0 overflow-hidden relative flex items-center justify-center mx-auto">
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

    const isFirstOfCategory = Boolean(showCategory && category != null && String(category).trim() !== "");
    const categoryId = isFirstOfCategory ? String(category).toLowerCase().replace(/\s+/g, "-") : undefined;

    return (
        <div className="project relative -mt-2 flex-shrink-0 w-[380px] 2xl:w-[550px]" id={categoryId}>
            {slug && !onOpenPopup ? (
                <a href={`project/${slug}`} className={`relative ${cardClass}`}>
                    {isFirstOfCategory && (
                        <span className="absolute top-1/2 left-0 -rotate-90 text-3xl font-semibold tracking-wide uppercase text-[#fffdd0]/80">
                            {category}
                        </span>
                    )}

                    {content}
                </a>
            ) : (
                <button
                    type="button"
                    onClick={handleClick}
                    className={`${cardClass} relative w-full text-left cursor-pointer`}
                >
                    {isFirstOfCategory && (
                        <span className="absolute top-1/2 -translate-y-1/2 -left-[36px] font-alegreya-sans -rotate-90 text-2xl tracking-wide uppercase text-[#fffdd0]/80">
                            {category}
                        </span>
                    )}

                    {content}
                </button>
            )}
        </div>
    );
}
