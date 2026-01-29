"use client";
import React, { useEffect, useRef, useState } from "react";

// Components
import SlideContent from "../components/SlideContent";
import projects from "@/data/projects.json";
import projectsAnimation from "../animations/projectsAnimation";
import YearLabel from "../components/ui/YearLabel";

const YEAR_KEYS = ["jaar 1", "jaar 2", "jaar 3"];

function getBreakpoints(projects) {
    const counts = YEAR_KEYS.map((y) => projects.filter((p) => p.year === y).length);
    const total = counts.reduce((a, b) => a + b, 0) || 1;
    return {
        b1: counts[0] / total,
        b2: (counts[0] + counts[1]) / total,
    };
}

export default function Projects() {
    const sectionRef = useRef(null);
    const viewportRef = useRef(null);
    const trackRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const { b1, b2 } = getBreakpoints(projects);

    useEffect(() => {
        const cleanup = projectsAnimation(
            sectionRef.current,
            viewportRef.current,
            trackRef.current,
            setScrollProgress
        );
        return cleanup;
    }, []);

    const tailProgress = (start, end) => {
        if (scrollProgress < start) return 0;
        if (scrollProgress >= end) return 1;
        return (scrollProgress - start) / (end - start);
    };

    return (
        <section ref={sectionRef} className="overflow-hidden grid grid-cols-1 items-center py-16" id="projects">
            <div className="my-auto">
                <div className="container">
                    <h2 className="text-5xl mb-4 pb-1">Mijn projecten</h2>
                </div>

                <div className="px-5 flex gap-8 items-start">
                    <div className="flex flex-col gap-8 flex-nowrap flex-shrink-0">
                        <YearLabel
                            year="Jaar 1"
                            hasTail
                            isReached={scrollProgress >= 0}
                            isActive={scrollProgress >= 0 && scrollProgress < b1}
                            tailProgress={tailProgress(0, b1)}
                        />
                        <YearLabel
                            year="Jaar 2"
                            hasTail
                            isReached={scrollProgress >= b1}
                            isActive={scrollProgress >= b1 && scrollProgress < b2}
                            tailProgress={tailProgress(b1, b2)}
                        />
                        <YearLabel
                            year="Jaar 3"
                            isReached={scrollProgress >= b2}
                            isActive={scrollProgress >= b2}
                        />
                    </div>

                    <div ref={viewportRef} className="overflow-x-hidden flex-1 min-w-0 aspect-square flex items-start">
                        <div className="flex gap-8 flex-nowrap" ref={trackRef}>
                            {projects
                                .filter((p) => p.year === "jaar 1")
                                .map((project) => (
                                    <div key={project.title}>
                                        <SlideContent {...project} />
                                    </div>
                                ))}
                            {projects
                                .filter((p) => p.year === "jaar 2")
                                .map((project) => (
                                    <div key={project.title}>
                                        <SlideContent {...project} />
                                    </div>
                                ))}
                            {projects
                                .filter((p) => p.year === "jaar 3")
                                .map((project) => (
                                    <div key={project.title}>
                                        <SlideContent {...project} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
