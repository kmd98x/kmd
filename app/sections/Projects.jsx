"use client";
import React, { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
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

                {/* <div
                    className="absolute top-[310px] w-screen h-[130px] z-50 bg-black"
                    style={{
                        borderRadius: "100%",
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0
                    }}
                ></div>

                <div
                    className="absolute bottom-[110px] w-full h-[150px] z-50 bg-black"
                    style={{
                        borderRadius: "100%",
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0
                    }}
                ></div> */}

                <div
                    className="pointer-events-none absolute inset-0 w-full h-full z-50"
                    style={{
                        background: "linear-gradient(90deg, black 0%, transparent 30%, transparent 70%, black 100%)",
                    }}
                />

                <Swiper
                    className="projects-coverflow overflow-visible"
                    modules={[EffectCoverflow]}
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    slidesPerView="auto"
                    spaceBetween={32}
                    coverflowEffect={{
                        rotate: 80,
                        depth: -100,
                        modifier: 0.2,
                        scale: 1.2,
                    }}
                >
                    {(() => {
                        const seenCategories = new Set();

                        return projects.map((project, index) => {
                            const category = project.category ?? project.year;
                            const isFirstOfCategory =
                                category && !seenCategories.has(category);

                            if (isFirstOfCategory) {
                                seenCategories.add(category);
                            }

                            return (
                                <SwiperSlide
                                    key={project.id ?? index}
                                    className="!w-[min(88vw,420px)]"
                                >
                                    <SlideContent
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
