'use client';

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectSections({ sections }) {
	const containerRef = useRef(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			const sectionsEls = gsap.utils.toArray(".project-section");

			sectionsEls.forEach((section) => {
				const left = section.querySelector(".section-left");
				const right = section.querySelector(".section-right");

				if (left) {
					gsap.fromTo(
						left,
						{ y: 100 },
						{
							y: -100,
							ease: "none",
							scrollTrigger: {
								trigger: section,
								start: "top top",
								end: "bottom top",
								scrub: true,
								snap: 1,
							},
						}
					);
				}

				if (right) {
					gsap.fromTo(
						right,
						{ y: -100 },
						{
							y: 100,
							ease: "none",
							scrollTrigger: {
								trigger: section,
								start: "top top",
								end: "bottom top",
								scrub: true,
								snap: 1,
							},
						}
					);
				}
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={containerRef}>
			{sections.map((section) => (
				<div
					key={section.id}
					className="project-section relative flex items-center h-screen"
				>
					{typeof section.id === "number" && section.id % 2 === 0 ? (
						<>
							<div className="section-left w-1/2 h-screen relative">
								<Image
									className="w-full h-full object-cover"
									src="/projects/example.jpeg"
									alt={section.title}
									width={1200}
									height={800}
								/>
							</div>

							<div className="section-right px-24 w-1/2">
								<h2 className="text-7xl font-bold text-white">
									{section.title}
								</h2>
								<p className="mt-4 text-white/80 text-2xl">
									{section.content}
								</p>
							</div>
						</>
					) : (
						<>
							<div className="section-left px-24 w-1/2">
								<h2 className="text-7xl font-bold text-white">
									{section.title}
								</h2>
								<p className="mt-4 text-white/80 text-2xl">
									{section.content}
								</p>
							</div>

							<div className="section-right w-1/2 h-screen relative">
								<Image
									className="w-full h-full object-cover"
									src="/projects/example.jpeg"
									alt={section.title}
									width={1200}
									height={800}
								/>
							</div>
						</>
					)}
				</div>
			))}
		</div>
	);
}

