"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

export default function Projects() {
    return (
        <section className="container my-20 overflow-hidden" id="projects">
            <h2 className="text-xl font-bold mb-4">Mijn Projecten</h2>

            <Swiper 
                className="overflow-visible"
                spaceBetween={20}
                slidesPerView={1.25}
                breakpoints={{ 
                    768: {
                        slidesPerView: 2,
                    },
                 }}>

                <SwiperSlide className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <img src="/projects/laptop.png" className="absolute -z-10 size-full object-cover" alt="Laptop" />

                    <div className="size-full bg-black/95 flex flex-col items-start justify-end gap-1 p-5 hover:opacity-0 duration-500 transition-opacity">
                        <h3 className="font-bold">Project 1</h3>
                        <p>Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls.</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="project aspect-[4/3] rounded-lg overflow-hidden">
                    <img src="/projects/sd-card.png" className="absolute -z-10 size-full object-cover" alt="Laptop" />

                    <div className="size-full bg-black/95 flex flex-col items-start justify-end gap-1 p-5 hover:opacity-0 duration-500 transition-opacity">
                        <h3 className="font-bold">Project 2</h3>
                        <p>Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls.</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    );
}
