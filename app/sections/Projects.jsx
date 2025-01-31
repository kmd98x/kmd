"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, FreeMode } from 'swiper/modules';
import "swiper/css";

// Components
import SlideContent from "../components/SlideContent";
import projects from '../data/projects'

export default function Projects() {
    return (
        <section className="overflow-hidden grid grid-cols-1 items-center py-16" id="projects">
            <div className="my-auto">
                <div className="container">
                    <h2 className="text-xl font-bold mb-4 pb-1">Mijn Projecten</h2>
                </div>
    
                <div className="px-5">
                    <Swiper
                        modules={[Mousewheel, FreeMode]}
                        mousewheel={true}
                        className="!overflow-visible"
                        direction="horizontal"
                        spaceBetween={20}
                        slidesPerView={1.05}
                        freeMode={true}
                        breakpoints={{
                            600: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                    >
                        {projects.map((project, index) => (
                            <SwiperSlide key={index} className="project aspect-[4/5.5]">
                                <SlideContent {...project} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
