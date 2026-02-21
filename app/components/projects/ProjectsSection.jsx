"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "../../data/projects.json";
import ProjectCard from "./ProjectCard";
import ProjectContent from "./ProjectContent";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_COUNT = projects.length;
const SCROLL_HEIGHT_VH = PROJECTS_COUNT * 7;

export default function ProjectsSection() {
    const [activeIndex, setActiveIndex] = useState(PROJECTS_COUNT - 1);
    const spacerRef = useRef(null);
    const pinRef = useRef(null);

    useEffect(() => {
        const spacer = spacerRef.current;
        const pin = pinRef.current;
        if (!spacer || !pin) return;

        const progressRef = { value: 0 };
        const tween = gsap.to(progressRef, {
            value: 1,
            ease: "none",
            scrollTrigger: {
                trigger: spacer,
                start: "top top",
                end: `+=${SCROLL_HEIGHT_VH}vh`,
                pin: pin,
                pinSpacing: true,
                scrub: 1,
            },
            onUpdate: function () {
                const progress = progressRef.value;
                const index =
                    PROJECTS_COUNT - 1 - Math.floor(progress * PROJECTS_COUNT);
                setActiveIndex(Math.max(0, index));
            },
        });

        return () => {
            tween.kill();
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === spacer) t.kill();
            });
        };
    }, []);

    return (
        <div
            ref={spacerRef}
            style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
            className="relative"
        >
            <article ref={pinRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                    {projects[activeIndex] && (
                        <ProjectContent project={projects[activeIndex]} />
                    )}
                </section>

                <section className="relative min-h-[520px] flex items-center justify-center">
                    <div className="relative w-[480px] h-[520px]">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={index}
                                project={project}
                                index={index}
                                total={projects.length}
                                activeIndex={activeIndex}
                                offsetX={(index + 1) * 20}
                                onSelect={setActiveIndex}
                            />
                        ))}
                    </div>
                </section>
            </article>
        </div>
    );
}
