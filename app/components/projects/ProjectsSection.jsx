"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "../../data/projects.json";
import ProjectCard from "./ProjectCard";
import ProjectContent from "./ProjectContent";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_COUNT = projects.length;
const STEPS = PROJECTS_COUNT - 1;
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
                scrub: 3,
                snap: {
                    snapTo: 1 / STEPS,
                    duration: { min: 0.8, max: 1.5 },
                    delay: 0.15,
                    ease: "power2.inOut",
                },
            },
            onUpdate: function () {
                const progress = progressRef.value;
                const index = STEPS - Math.round(progress * STEPS);
                setActiveIndex(Math.max(0, Math.min(STEPS, index)));
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
            <article ref={pinRef}>
                <h2 className="text-4xl text-montez col-span-2 h-fit container">Mijn projecten</h2>

                <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 mt-20">
                    <section className="max-md:col-start-2">
                        {projects[activeIndex] && (
                            <ProjectContent project={projects[activeIndex]} />
                        )}
                    </section>

                    <section className="relative min-h-[520px] flex items-center justify-end max-md:col-start-1">
                        <div className="relative w-full h-[520px]">
                            {projects.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    project={project}
                                    index={index}
                                    total={projects.length}
                                    activeIndex={activeIndex}
                                    offsetX={Math.pow(index + 1, 2)}
                                    onSelect={setActiveIndex}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </article>
        </div>
    );
}
