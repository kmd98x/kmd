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
const ringRadiusScale = NUM_PANELS / REF_PANELS;
const ringZ = RING_Z_BASE * ringRadiusScale;

/**
 * Faces were full W×H of the stage → one panel filled the view (~70°+ wide).
 * Shrink each face (scale) + set cylinder radius from width so 4 of 6 read at once.
 */
const STAGE_MAX_WIDTH_PX = 1000;
const STAGE_MAX_WIDTH_VW_RATIO = 0.42;
/** Max stage width as a fraction of stage height (higher → wider card faces) */
const STAGE_WIDTH_PER_HEIGHT = 5;
/** Fraction of padded root height used for the stage (lower → shorter cards) */
const STAGE_HEIGHT_RATIO = 1;
/** z ≈ this × stage width (tight cylinder behind a strip of cards) */
const RING_Z_FROM_WIDTH = 2;
const RING_Z_MIN = 175;
const RING_Z_MAX = 1920;
/** Uniform scale on each .img (rotateY + z define the horizontal ring) */
const PANEL_FACE_SCALE = 0.34;
const PERSPECTIVE_MIN = 12000;
const PERSPECTIVE_MAX = 42000;
/** perspective ≈ z × this (wide field → more arc visible) */
const PERSPECTIVE_PER_Z = 42;

/**
 * Stage fills the carousel root (your STAGE_* caps above are not used for size).
 * Ring depth + face scale are derived from that box so ~4 large cards read at once.
 */
const SECTION_WIDTH_RATIO = 0.88;
const SECTION_HEIGHT_RATIO = 0.88;
/** Ring radius ≈ stage width × this (tighter → more faces visible) */
const RING_Z_STAGE_RATIO = 0.46;
/** Each card face ≈ this fraction of the stage width on the ring */
const RING_FACE_SCALE = 0.58;
const PERSPECTIVE_VISUAL_BOOST = 1.35;

/** Card: image fills upper area; title, excerpt, CTA pinned to bottom */
const cardClass =
	`${styles.cardInner} relative flex h-full w-full min-h-0 flex-col items-stretch py-4 px-4 text-left group card-surface sm:py-5 sm:px-6`;

function getClientX(e) {
	if (e?.touches?.[0]) return Math.round(e.touches[0].clientX);
	return Math.round(e?.clientX ?? 0);
}

function measureStage(rootW, rootH) {
	return {
		w: Math.max(320, Math.round(rootW * SECTION_WIDTH_RATIO)),
		h: Math.max(300, Math.round(rootH * SECTION_HEIGHT_RATIO)),
	};
}

function ringPanelScale() {
	return RING_FACE_SCALE;
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
		<div className={styles.cardMedia}>
			<div
				className={`${styles.imageWrap} mx-auto flex h-full w-full max-w-full items-center justify-center overflow-hidden`}
			>
			<div className={`${styles.parallaxShift} relative h-full w-full`}>
				<div className={styles.imageFrame}>
					<Image
						src={`/projects/${project.image}`}
						alt={project.title}
						fill
						sizes="(max-width: 768px) 90vw, 560px"
						className="object-contain"
						draggable={false}
					/>
				</div>
			</div>
		</div>
		</div>
	);

	const textBlock = (
		<div className={styles.cardFooter}>
			<h3 className={styles.cardTitle}>{project.title}</h3>
			{project.excerpt ? (
				<p className={styles.cardExcerpt}>{project.excerpt}</p>
			) : null}
			{project.slug ? (
				<span className={styles.cardCta}>Bekijk project</span>
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
				{imageBlock}
				{textBlock}
			</Link>
		);
	}

	return (
		<div className={`${cardClass} cursor-default`}>
			{imageBlock}
			{textBlock}
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
			const faceSelector = `.${styles.cardFace}`;
			const parallaxSelector = `.${styles.parallaxShift}`;

			function getRingGeometry() {
				const { w } = layoutRef.current;
				const panelScale = ringPanelScale();
				if (w < 4) {
					return {
						zD: ringZ,
						parallax: PARALLAX_BASE * ringRadiusScale,
						panelScale,
					};
				}
				const zD = Math.min(
					RING_Z_MAX,
					Math.max(RING_Z_MIN, Math.round(w * RING_Z_STAGE_RATIO)),
				);
				const parallax =
					PARALLAX_BASE *
					ringRadiusScale *
					(zD / Math.max(ringZ, 1)) *
					0.5 *
					panelScale;
				return { zD, parallax, panelScale };
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
					y: 0,
				});
			});

			function applyPanelLayout() {
				const { zD, panelScale } = getRingGeometry();
				gsap.set(panelSelector, {
					rotateY: (i) => i * -step,
					rotateX: 0,
					transformOrigin: `50% 50% ${zD}px`,
					z: -zD,
					backfaceVisibility: "hidden",
				});
				gsap.set(faceSelector, {
					scale: panelScale,
					transformOrigin: "50% 50%",
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
					PERSPECTIVE_MAX,
					Math.max(
						PERSPECTIVE_MIN,
						zD * PERSPECTIVE_PER_Z * PERSPECTIVE_VISUAL_BOOST,
					),
				);

				container.style.width = `${w}px`;
				container.style.height = `${h}px`;
				container.style.perspective = `${perspectivePx}px`;
				container.style.setProperty(
					"--ring-face-scale",
					String(getRingGeometry().panelScale),
				);

				applyPanelLayout();
			}

			const reduceMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)",
			).matches;

			applyLayout();

			const tl = gsap.timeline();
			tl.set(dragger, { opacity: 0 }).set(ring, {
				rotationY: 180,
				rotationX: 0,
			});

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
							<div className={styles.cardFace}>
								<CarouselSlideCard project={project} />
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={`${styles.vignette} ${styles.abs}`} aria-hidden />
			<div ref={draggerRef} className={`${styles.dragger} ${styles.abs}`} />
		</div>
	);
}
