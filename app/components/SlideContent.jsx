import React from "react";
import Image from "next/image";

export default function SlideContent({ image, title, text, excerpt, link, linkText, slug, category, showCategory, project, onOpenPopup }) {
    const handleClick = () => {
        if (onOpenPopup && project) {
            onOpenPopup(project);
        }
    };

    const cardClass = "flex flex-col items-center items-stretch justify-between gap-12 min-h-[200px] md:min-h-[550px] py-7 px-5 group card-surface";
    const content = (
        <>
            <div className="w-[240px] h-[240px] sm:w-[400px] sm:h-[400px] flex-shrink-0 overflow-hidden relative flex items-center justify-center mx-auto">
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
                <p className="max-w-[60ch] hidden sm:block">{excerpt}</p>
                {(slug || onOpenPopup) && (
                    <button
                        type="button"
                        className="inline-block text-[#fffdd0] px-2 py-1 mt-2 card-surface"
                    >
                        {slug ? "Bekijk project" : "Bekijk meer"}
                    </button>
                )}
            </div>
        </>
    );

    const isFirstOfCategory = Boolean(showCategory && category != null && String(category).trim() !== "");

    return (
        <div className="project relative -mt-2 flex-shrink-0 w-[300px]  md:w-[480px]">
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
                <div
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
                </div>
            )}
        </div>
    );
}
