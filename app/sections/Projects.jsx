"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Components
import SlideContent from "../components/SlideContent";
import projects from '../data/projects'

export default function Projects() {
    return (
        <section className="overflow-hidden" id="projects">
            <div>
                <div className="container">
                    <h2 className="text-xl font-bold mb-4 pb-1">Mijn Projecten</h2>
                </div>
    
                <div className="px-5">
                    <Swiper
                        className="!overflow-visible"
                        direction="horizontal"
                        spaceBetween={20}
                        slidesPerView={1.05}
                        mousewheel={true}
                        freeMode={true}
                        breakpoints={{
                            600: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 5,
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
