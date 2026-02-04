"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import projectsData from "@/data/projects.json";

gsap.registerPlugin(ScrollTrigger);

const YEAR_ORDER = ["jaar 1", "jaar 2", "jaar 3"];

const sortedProjects = [...projectsData].sort((a, b) => {
    return YEAR_ORDER.indexOf(a.year) - YEAR_ORDER.indexOf(b.year);
});

function isFirstOfYear(projects, index) {
    return index === 0 || projects[index - 1].year !== projects[index].year;
}

function yearLabel(year) {
    const num = year.replace("jaar ", "");
    return `Jaar ${num}`;
}

export default function NewProjects() {
    const sectionRef = useRef(null);
    const wheelRef = useRef(null);

    const angleStep = 360 / sortedProjects.length;
    const radius = 720; // distance from center in px (larger = more space between cards)

    useEffect(() => {
        const section = sectionRef.current;
        const wheel = wheelRef.current;
        if (!section || !wheel) return;

        // One full rotation through all projects
        const totalRotation = -angleStep * sortedProjects.length;

        const tween = gsap.fromTo(
            wheel,
            { rotateY: 0 },
            {
                rotateY: totalRotation,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top 20%",
                    end: "+=6000",
                    pin: true,
                    scrub: true,
                },
            }
        );

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, [angleStep]);

    return (
        <section ref={sectionRef} className="py-16" id="new-projects">
            <div className="container">
                <h2 className="text-xl font-bold mb-8 pb-1">Mijn Projecten (3D carrousel)</h2>

                <div
                    className="relative mx-auto w-full max-w-7xl min-h-screen h-[100vh] overflow-visible"
                    style={{ perspective: "1600px" }}
                >
                    <div
                        className="absolute inset-0 flex items-start justify-center origin-center"
                        style={{ transform: "rotateX(18deg) scale(0.9)", transformStyle: "preserve-3d" }}
                    >
                        <div
                            ref={wheelRef}
                            className="absolute inset-0 flex items-start justify-center"
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                        >
                        {sortedProjects.map((project, index) => {
                            const angle = index * angleStep;
                            const showYear = isFirstOfYear(sortedProjects, index);

                            return (
                                <div
                                    key={`${project.year}-${project.title}`}
                                    className="absolute flex flex-col items-center gap-4"
                                    style={{
                                        transform: `rotateY(${angle}deg) translateZ(${radius}px)${showYear ? " translateY(-2.5rem)" : ""}`,
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    {showYear && (
                                        <span className="text-xl font-bold whitespace-nowrap text-[#fffdd0] tracking-[0.2em] uppercase">
                                            {yearLabel(project.year)}
                                        </span>
                                    )}
                                    <div
                                        className="h-96 w-72 flex flex-col overflow-hidden rounded-md border border-[#fffdd0]/[.15] bg-[#131313] flex-shrink-0"
                                    >
                                        <div className="flex-1 min-h-0 relative" style={{ transform: "scaleX(-1)" }}>
                                            <img
                                                src={project.image.startsWith("new-projects/") ? `/${project.image}` : `/projects/${project.image}`}
                                                alt={project.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <span className="text-[#fffdd0] text-sm font-bold text-center px-2 py-2 shrink-0">
                                            {project.title}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}