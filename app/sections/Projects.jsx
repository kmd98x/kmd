"use client";
import React, { useEffect, useRef, useState } from "react";

// Components
import SlideContent from "../components/SlideContent";
import ProjectPopup from "../components/ProjectPopup";
import projects from '../data/projects'
import projectsAnimation from "../animations/projectsAnimation";

export default function Projects() {
    const container = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        projectsAnimation(container.current);
    }, []);

    return (
        <section className="overflow-hidden grid grid-cols-1 items-center py-16" id="projects">
            <div className="my-auto container">
                <div className="mb-8">
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
