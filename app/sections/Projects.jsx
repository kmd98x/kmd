"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SlideContent from "../components/SlideContent";

export default function Projects() {

    const projects = [
        {
            image: "2.svg",
            title: "Project 1",
            text: "Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls.",
            link: "https://www.figma.com/proto/IsvvrtYEZJNHAAfpJsyBxW/Blok-2-SLB-Workout-app?node-id=105-3&t=hnGenhcS1xf4FUlF-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=105%3A3&show-proto-sidebar=1&hide-ui=1"
        },
        {
            image: "desktop-home.png",
            title: "Project 1",
            text: "Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls",
            link: "https://kmd98x.github.io/kmdportfolio/index.html"
        },
        {
            image: "3.svg",
            title: "Project 2",
            text: "Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls.",
        },
        {
            image: "4.svg",
            title: "Project 1",
            text: "Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls",
        },
        {
            image: "5.svg",
            title: "Project 1",
            text: "Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls",
        },
        {
            image: "6.svg",
            title: "Project 1",
            text: "Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls",
        },
        {
            image: "7.svg",
            title: "Project 1",
            text: "Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls",
            link: "https://www.figma.com/proto/IsvvrtYEZJNHAAfpJsyBxW/Blok-2-SLB-Workout-app?node-id=105-3&t=hnGenhcS1xf4FUlF-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=105%3A3&show-proto-sidebar=1&hide-ui=1"
        },
        {
            image: "8.svg",
            title: "Project 1",
            text: "Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls",
        },
        {
            image: "dashboard.svg",
            title: "Project 1",
            text: "Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls",
        },
        {
            image: "flyer.svg",
            title: "Project 1",
            text: "Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls",
        },
        {
            image: "zero-state.svg",
            title: "Project 1",
            text: "Lorem ipsum tren vallning hexade såsom pågåt. Kvasilgen öbel prekanar. Osunat prebeliga bävls",
        },
    ];


    return (
        <section className="my-20 overflow-hidden" id="projects">
            <div className="container">
                <h2 className="text-xl font-bold mb-4">Mijn Projecten</h2>
    
                <Swiper
                    className="!overflow-visible"
                    spaceBetween={20}
                    slidesPerView={1.25}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                    }}
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={index} className="project aspect-[4/6] rounded-lg overflow-hidden">
                            <SlideContent {...project} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
