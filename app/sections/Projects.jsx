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
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
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
