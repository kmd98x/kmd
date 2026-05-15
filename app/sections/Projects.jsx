"use client";
import React, { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Components
import SlideContent from "../components/SlideContent";
import ProjectPopup from "../components/ProjectPopup";
import projects from '../data/projects'
import titleAnimation from "../animations/titleAnimation";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const titleRef = useRef(null);

    useEffect(() => {
        titleAnimation(titleRef.current);
    }, []);

    return (
        <section className="flex flex-col justify-center pt-16 min-h-screen relative" id="projects">
            <div>
                <div className="container mb-8 flex-shrink-0">
                    <h2 className="relative text-montez" ref={titleRef}>Mijn projecten</h2>
                </div>

                <div
                    className="absolute top-[310px] w-full h-[100px] z-50 bg-black"
                    style={{
                        borderRadius: "100%",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0
                    }}
                />

                <div
                    className="absolute bottom-[150px] w-full h-[100px] z-50 bg-black"
                    style={{
                        borderRadius: "100%",
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0
                    }}
                />

                <div
                    className="pointer-events-none absolute inset-0 w-full h-full z-50"
                    style={{
                        background: "linear-gradient(90deg, black 0%, transparent 30%, transparent 70%, black 100%)",
                    }}
                />


                <Swiper
                    spaceBetween={0}
                    freeMode={true}
                    slidesPerView={3.8}
                >
                    <div className="swiper-wrapper flex gap-8 flex-nowrap">
                        {(() => {
                            const seenCategories = new Set();

                            return projects.map((project, index) => {
                                const category = project.category ?? project.year;
                                const isFirstOfCategory = category && !seenCategories.has(category);

                                if (isFirstOfCategory) {
                                    seenCategories.add(category);
                                }

                                return (
                                    <SwiperSlide key={project.id ?? index}>
                                        <SlideContent
                                            key={project.id ?? index}
                                            {...project}
                                            project={project}
                                            category={category}
                                            showCategory={isFirstOfCategory}
                                            onOpenPopup={setSelectedProject}
                                        />
                                    </SwiperSlide>
                                );
                            });
                        })()}
                    </div>
                </Swiper>
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
