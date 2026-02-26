"use client";
import React, { useEffect, useRef, useState } from "react";

// Components
import SlideContent from "../components/SlideContent";
import ProjectPopup from "../components/ProjectPopup";
import projects from '../data/projects'
import projectsAnimation from "../animations/projectsAnimation";
import titleAnimation from "../animations/titleAnimation";

export default function Projects() {
    const container = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const titleRef = useRef(null);

    useEffect(() => {
        projectsAnimation(container.current);
        titleAnimation(titleRef.current);
    }, []);

    return (
        <section className="overflow-hidden flex flex-col justify-center pt-16 min-h-screen" id="projects">
            <div className="container flex flex-col">
                <div className="mb-8 flex-shrink-0">
                    <h2 className="relative text-montez" ref={titleRef}>Mijn projecten</h2>
                </div>

                <div className="flex-1 min-h-0 flex flex-col justify-center">
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
                                        key={project.id ?? index}
                                        {...project}
                                        project={project}
                                        category={category}
                                        showCategory={isFirstOfCategory}
                                        onOpenPopup={setSelectedProject}
                                    />
                                );
                            });
                        })()}
                    </div>
                </div>
            </div>

            {selectedProject && (
                <ProjectPopup
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
}
