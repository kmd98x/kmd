"use client";
import React, { useEffect, useRef } from "react";

// Components
import SlideContent from "../components/SlideContent";
import projects from '../data/projects'
import projectsAnimation from "../animations/projectsAnimation";

export default function Projects() {
    const container = useRef(null);
    
    useEffect(() => {
        projectsAnimation(container.current);
    }, [])

    return (
        <section className="overflow-hidden grid grid-cols-1 items-center py-16" id="projects">
            <div className="my-auto">
                <div className="container mb-8">
                    <h2 className="relative text-montez">Mijn projecten</h2>
                </div>
    
                <div className="px-5">
                    <div className="flex gap-8 flex-nowrap" ref={container}>
                        {projects.map((project, index) => (
                            <SlideContent key={index} {...project} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
