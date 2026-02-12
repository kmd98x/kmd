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
                        {(() => {
                            const seenCategories = new Set();

                            return projects.map((project, index) => {
                                const category = project.category ?? project.year;
                                const isFirstOfCategory = category && !seenCategories.has(category);

                                if (isFirstOfCategory) {
                                    seenCategories.add(category);
                                }

                                return (
                                    <SlideContent
                                        key={index}
                                        {...project}
                                        category={category}
                                        showCategory={isFirstOfCategory}
                                    />
                                );
                            });
                        })()}
                    </div>
                </div>
            </div>
        </section>
    );
}
