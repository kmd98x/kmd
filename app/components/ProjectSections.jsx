'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

function SectionBlock({ item }) {
	if (item.image) {
		return (
			<Image
				className="w-full h-full object-cover"
				src={`/projects/${item.image}`}
				alt=""
				width={1200}
				height={800}
			/>
		);
	}
	if (item.title != null || item.content != null) {
		return (
			<div className="py-8 px-16 flex flex-col justify-center">
				<h2 className="text-4xl font-bold text-white">{item.title}</h2>
				<p className="mt-4 text-white/80 text-lg">{item.content}</p>
			</div>
		);
	}
	return null;
}

export default function ProjectSections({ sections }) {
	const left = sections?.left ?? [];
	const right = sections?.right ?? [];
	const [slideIndex, setSlideIndex] = useState(0);
	const leftColRef = useRef(null);
	const rightColRef = useRef(null);

	// One "slide" = one div on each side; total slides = number of divs (use the larger column)
	const slideCount = Math.max(left.length, right.length, 1);
	const maxIndex = Math.max(slideCount - 1, 0);

	const goNext = useCallback(() => {
		setSlideIndex((i) => Math.min(i + 1, maxIndex));
	}, [maxIndex]);

	const goPrev = useCallback(() => {
		setSlideIndex((i) => Math.max(i - 1, 0));
	}, []);

	// Animate to show the div at slideIndex (0 = first div, 1 = second div, ...)
	useEffect(() => {
		const leftCol = leftColRef.current;
		const rightCol = rightColRef.current;
		if (!leftCol || !rightCol) return;

		const vhPx = window.innerHeight;
		const leftY = -slideIndex * vhPx;
		const rightY = slideIndex * vhPx;

		gsap.to(leftCol, { y: leftY, duration: 2, ease: "power2.out" });
		gsap.to(rightCol, { y: rightY, duration: 2, ease: "power2.out" });
	}, [slideIndex]);

	// Wheel: accumulate deltaY and advance one slide per "scroll" (threshold), so each div is shown per scroll
	useEffect(() => {
		const THRESHOLD = 80;
		let accumulated = 0;

		const handleWheel = (e) => {
			e.preventDefault();
			accumulated += e.deltaY;

			if (accumulated >= THRESHOLD) {
				accumulated = 0;
				goNext();
			} else if (accumulated <= -THRESHOLD) {
				accumulated = 0;
				goPrev();
			}
		};

		const el = document.getElementById("project-sections-viewport");
		if (!el) return;
		el.addEventListener("wheel", handleWheel, { passive: false });
		return () => el.removeEventListener("wheel", handleWheel);
	}, [goNext, goPrev]);

	const rightOffset = (right.length - 1) * 100;

	return (
		<div
			id="project-sections-viewport"
			className="h-screen overflow-hidden flex"
		>
			<div
				ref={leftColRef}
				className="w-1/2 flex flex-col shrink-0"
			>
				{left.map((item, index) => (
					<div
						key={`left-${index}`}
						className="min-h-screen h-screen relative flex items-center justify-center shrink-0"
					>
						<SectionBlock item={item} />
					</div>
				))}
			</div>
			<div
				ref={rightColRef}
				className="w-1/2 flex flex-col shrink-0"
				style={{
					marginTop: right.length > 0 ? `-${rightOffset}vh` : 0,
				}}
			>
				{right.map((item, index) => (
					<div
						key={`right-${index}`}
						className="min-h-screen h-screen relative flex items-center justify-center shrink-0"
					>
						<SectionBlock item={item} />
					</div>
				))}
			</div>
		</div>
	);
}
