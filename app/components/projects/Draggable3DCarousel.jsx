"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import projects from "../../data/projects.json";
import styles from "./Draggable3DCarousel.module.css";

gsap.registerPlugin(useGSAP, Draggable);

const NUM_PANELS = 6;
/** Original demo used 10 panels at z ±500; scale radius so arc spacing between neighbors stays the same */
const REF_PANELS = 10;
const RING_Z_BASE = 500;
const PARALLAX_BASE = 400;
const BASE_STAGE = 300;
const ringRadiusScale = NUM_PANELS / REF_PANELS;
const ringZ = RING_Z_BASE * ringRadiusScale;

/**
 * Stage width cap (cards stay narrow).
 * Ring depth was scaling with max(w,h) → huge cylinder → only 1 face reads.
 * RING_DEPTH_TIGHTEN + z clamps + strong perspective ≈ 4 of 6 faces visible.
 */
const STAGE_MAX_WIDTH_PX = 400;
const STAGE_MAX_WIDTH_VW_RATIO = 0.34;
/** Extra perspective beyond z * PERSPECTIVE_PER_Z (pulls camera back) */
const PERSPECTIVE_FLOOR = 5200;
const PERSPECTIVE_CEILING = 20000;
/** z = ringZ * layoutScale * this (lower → tighter ring, more faces in frame) */
const RING_DEPTH_TIGHTEN = 0.34;
/** perspective ≈ z * this (higher → wider field, more arc visible) */
const PERSPECTIVE_PER_Z = 13;

/** Card: image fills upper area; title, excerpt, CTA pinned to bottom */
const cardClass =
	"relative flex h-full w-full min-h-0 flex-col items-stretch py-4 px-4 text-left group card-surface sm:py-5 sm:px-5";

function getClientX(e) {
	if (e?.touches?.[0]) return Math.round(e.touches[0].clientX);
	return Math.round(e?.clientX ?? 0);
}

function measureStage(rootW, rootH) {
	const padX = 0.035;
	const padY = 0.055;
	const wFull = rootW * (1 - 2 * padX);
	const h = Math.max(300, Math.round(rootH * (1 - 2 * padY)));
	const maxW = Math.min(
		STAGE_MAX_WIDTH_PX,
		rootW * STAGE_MAX_WIDTH_VW_RATIO,
		Math.round(h * 0.58),
	);
	const w = Math.max(260, Math.round(Math.min(wFull, maxW)));
	return { w, h };
}

function debounce(fn, ms) {
	let t;
	return (...args) => {
		clearTimeout(t);
		t = setTimeout(() => fn(...args), ms);
	};
}

function CarouselSlideCard({ project }) {
	const imageBlock = (
		<div
			className={`${styles.imageWrap} mx-auto flex w-full max-w-full flex-shrink-0 items-center justify-center overflow-hidden`}
		>
			<div className={`${styles.parallaxShift} relative h-full w-full`}>
				<div className={styles.imageFrame}>
					<Image
						src={`/projects/${project.image}`}
						alt={project.title}
						fill
						sizes="(max-width: 768px) 85vw, 400px"
						className="object-contain"
						draggable={false}
					/>
				</div>
			</div>
		</div>
	);

	const textBlock = (
		<div className="w-full shrink-0 border-t border-[#fffdd0]/10 pt-3 sm:pt-4">
			<h3 className="mb-1 line-clamp-2 text-base font-bold leading-snug sm:text-lg">
				{project.title}
			</h3>
			{project.excerpt ? (
				<p className="mb-1 line-clamp-2 hidden max-w-[60ch] text-sm sm:block sm:text-base">
					{project.excerpt}
				</p>
			) : null}
			{project.slug ? (
				<span className="mt-2 inline-block px-3 py-1.5 text-sm text-[#fffdd0] card-surface sm:text-base">
					Bekijk project
				</span>
			) : null}
		</div>
	);

	if (project.slug) {
		return (
			<Link
				href={`/project/${project.slug}`}
				className={`${cardClass} cursor-pointer`}
				draggable={false}
			>
				<div className="flex min-h-0 flex-1 flex-col items-stretch">
					<div className="flex min-h-0 flex-1 flex-col items-center justify-center">
						{imageBlock}
					</div>
					{textBlock}
				</div>
			</Link>
		);
	}

	return (
		<div className={`${cardClass} cursor-default`}>
			<div className="flex min-h-0 flex-1 flex-col items-stretch">
				<div className="flex min-h-0 flex-1 flex-col items-center justify-center">
					{imageBlock}
				</div>
				{textBlock}
			</div>
		</div>
	);
}

export default function Draggable3DCarousel() {
	const rootRef = useRef(null);
	const containerRef = useRef(null);
	const ringRef = useRef(null);
	const draggerRef = useRef(null);
	const layoutRef = useRef({ w: 0, h: 0 });

	const panelProjects = useMemo(
		() => projects.slice(0, NUM_PANELS),
		[],
	);
	const step = 360 / panelProjects.length;

	useGSAP(
		(_ctx, contextSafe) => {
			const ring = ringRef.current;
			const dragger = draggerRef.current;
			const container = containerRef.current;
			const root = rootRef.current;
			if (!ring || !dragger || !container || !root || panelProjects.length === 0)
				return;

			const panelSelector = `.${styles.img}`;
			const parallaxSelector = `.${styles.parallaxShift}`;

			function getRingGeometry() {
				const { w, h } = layoutRef.current;
				if (w < 4 || h < 4) {
					return { zD: ringZ, parallax: PARALLAX_BASE * ringRadiusScale };
				}
				const maxDim = Math.max(w, h);
				const minDim = Math.min(w, h);
				const layoutScale = maxDim / BASE_STAGE;
				const zLoose = ringZ * layoutScale;
				const zD = Math.min(
					zLoose * RING_DEPTH_TIGHTEN,
					minDim * 0.9,
					maxDim * 0.46,
				);
				const parallax =
					PARALLAX_BASE *
					ringRadiusScale *
					Math.min(1.85, zD / Math.max(ringZ, 1));
				return { zD, parallax };
			}

			function getParallaxX(i) {
				const rotY = Number(gsap.getProperty(ring, "rotationY")) || 0;
				const wrapped = gsap.utils.wrap(0, 360, rotY - 180 - i * step);
				const { parallax } = getRingGeometry();
				return (-wrapped / 360) * parallax;
			}

			const dragParallax = contextSafe(() => {
				gsap.set(parallaxSelector, {
					x: (i) => getParallaxX(i),
				});
			});

			function applyPanelLayout() {
				const { zD } = getRingGeometry();
				gsap.set(panelSelector, {
					rotateY: (i) => i * -step,
					transformOrigin: `50% 50% ${zD}px`,
					z: -zD,
					backfaceVisibility: "hidden",
				});
				dragParallax();
			}

			function applyLayout() {
				/* Prefer root box; width uses layout viewport to avoid scrollbar ↔ width oscillation */
				const rect = root.getBoundingClientRect();
				const rw = Math.min(rect.width, document.documentElement.clientWidth);
				const rh = rect.height;
				if (rw < 8 || rh < 8) return;

				const { w, h } = measureStage(rw, rh);
				const prev = layoutRef.current;
				if (
					prev.w > 0 &&
					Math.abs(prev.w - w) <= 2 &&
					Math.abs(prev.h - h) <= 2
				) {
					return;
				}

				layoutRef.current = { w, h };

				const { zD } = getRingGeometry();
				const perspectivePx = Math.min(
					PERSPECTIVE_CEILING,
					Math.max(PERSPECTIVE_FLOOR, zD * PERSPECTIVE_PER_Z),
				);

				container.style.width = `${w}px`;
				container.style.height = `${h}px`;
				container.style.perspective = `${perspectivePx}px`;

				applyPanelLayout();
			}

			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			applyLayout();

			const tl = gsap.timeline();
			tl.set(dragger, { opacity: 0 }).set(ring, { rotationY: 180 });

			if (reduceMotion) {
				tl.set(panelSelector, { y: 0, opacity: 1 });
			} else {
				tl.from(panelSelector, {
					duration: 1.5,
					y:
						200 *
						ringRadiusScale *
						Math.min(
							2.2,
							getRingGeometry().zD / Math.max(ringZ, 1),
						),
					opacity: 0,
					stagger: 0.1,
					ease: "expo",
				});
			}

			let xPos = 0;

			const onDragStart = contextSafe((e) => {
				xPos = getClientX(e);
			});

			const onDrag = contextSafe((e) => {
				const cx = getClientX(e);
				gsap.to(ring, {
					rotationY: `-=${(cx - xPos) % 360}`,
					onUpdate: dragParallax,
				});
				xPos = cx;
			});

			const onDragEnd = contextSafe(() => {
				gsap.set(dragger, { x: 0, y: 0 });
			});

			const instances = Draggable.create(dragger, {
				trigger: container,
				allowEventDefault: true,
				onDragStart,
				onDrag,
				onDragEnd,
			});

			const debouncedLayout = debounce(applyLayout, 150);
			/* Window resize only — ResizeObserver on this root often thrashes with the
			   classic scrollbar ↔ clientWidth feedback loop and can peg the main thread. */
			window.addEventListener("resize", debouncedLayout, { passive: true });
			const rafIds = { outer: 0, inner: 0 };
			rafIds.outer = requestAnimationFrame(() => {
				rafIds.inner = requestAnimationFrame(() => applyLayout());
			});

			return () => {
				window.removeEventListener("resize", debouncedLayout);
				cancelAnimationFrame(rafIds.outer);
				cancelAnimationFrame(rafIds.inner);
				instances.forEach((d) => d.kill());
			};
		},
		{ scope: rootRef, dependencies: [step] },
	);

	return (
		<div ref={rootRef} className={styles.root}>
			<div
				ref={containerRef}
				className={`${styles.container} ${styles.abs}`}
			>
				<div ref={ringRef} className={`${styles.ring} ${styles.abs}`}>
					{panelProjects.map((project, i) => (
						<div
							key={project.id ?? project.slug ?? i}
							className={`${styles.img} ${styles.abs}`}
						>
							<CarouselSlideCard project={project} />
						</div>
					))}
				</div>
			</div>
			<div className={`${styles.vignette} ${styles.abs}`} aria-hidden />
			<div ref={draggerRef} className={`${styles.dragger} ${styles.abs}`} />
		</div>
	);
}
