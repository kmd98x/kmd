"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Components
import SlideContent from "../components/SlideContent";
import projects from '../data/projects'

export default function Projects() {
    return (
        <section className="my-20 overflow-hidden" id="projects">
            <div className="container">
                <h2 className="text-xl font-bold mb-4 pb-1">Mijn Projecten</h2>
    
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
                            slidesPerView: 3,
                        },
                    }}
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={index} className="project aspect-[4/6]">
                            <SlideContent {...project} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
