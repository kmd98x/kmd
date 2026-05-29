"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gsap from "gsap";
import React, { useCallback, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const ANIM_DURATION = 0.5;

function getFigmaEmbedUrl(link, slug) {
	if (!link || !link.includes("figma.com") || !slug) return null;
	try {
		const url = new URL(link);
		if (url.pathname.startsWith("/design/")) {
			const path = url.pathname;
			const params = new URLSearchParams(url.search);
			params.set("embed_host", slug);
			const qs = params.toString();
			return `https://embed.figma.com${path}${qs ? `?${qs}` : ""}`;
		}
		if (url.pathname.startsWith("/file/")) {
			const path = url.pathname.replace("/file/", "/design/");
			const params = new URLSearchParams(url.search);
			params.set("embed_host", slug);
			const qs = params.toString();
			return `https://embed.figma.com${path}${qs ? `?${qs}` : ""}`;
		}
	} catch (_) {}
	return null;
}

export default function ProjectPopup({ project, onClose }) {
	const overlayRef = useRef(null);
	const panelRef = useRef(null);
	const isClosingRef = useRef(false);
	const onCloseRef = useRef(onClose);

	onCloseRef.current = onClose;

	const handleClose = useCallback(() => {
		if (isClosingRef.current) return;

		const overlay = overlayRef.current;
		const panel = panelRef.current;

		if (!overlay || !panel) {
			onCloseRef.current();
			return;
		}

		isClosingRef.current = true;

		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (reducedMotion) {
			gsap.to(overlay, {
				opacity: 0,
				duration: 0.2,
				onComplete: () => onCloseRef.current(),
			});
			return;
		}

		gsap.to(panel, {
			y: "100%",
			duration: ANIM_DURATION * 0.85,
			ease: "power3.in",
		});

		gsap.to(overlay, {
			opacity: 0,
			duration: ANIM_DURATION * 0.75,
			onComplete: () => onCloseRef.current(),
		});
	}, []);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") handleClose();
		};

		document.addEventListener("keydown", handleEscape);
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [handleClose]);

	useEffect(() => {
		const overlay = overlayRef.current;
		const panel = panelRef.current;
		if (!overlay || !panel) return undefined;

		isClosingRef.current = false;

		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			mm.add("(prefers-reduced-motion: reduce)", () => {
				gsap.set(panel, { clearProps: "transform" });
				gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 });
			});

			mm.add("(prefers-reduced-motion: no-preference)", () => {
				gsap.set(overlay, { opacity: 0 });
				gsap.set(panel, { y: "100%" });
				gsap.to(overlay, { opacity: 1, duration: ANIM_DURATION * 0.8 });
				gsap.to(panel, { y: 0, duration: ANIM_DURATION, ease: "power3.out" });
			});
		});

		return () => ctx.revert();
	}, [project]);

	if (!project) return null;

	const links = Array.isArray(project.links) ? project.links.filter((l) => l && typeof l.link === "string" && l.link.trim()) : [];
	const embedLink = typeof project.embed === "string" && project.embed.trim() ? project.embed.trim() : null;
	const figmaEmbedUrl = getFigmaEmbedUrl(embedLink, project.slug);
	const videoSrc = typeof project.video === "string" && project.video.trim() ? project.video.trim() : null;
	const hasVideo = !!videoSrc;
	const hasFigma = !!figmaEmbedUrl;

	const portfolioImages = Array.isArray(project.portfolio)
		? project.portfolio
				.map((p) => (typeof p === "string" ? p.trim() : ""))
				.filter((p) => p)
		: [];
	const portfolioSrcs = portfolioImages.map((p) => `/projects/${p}`);
	const hasPortfolio = portfolioSrcs.length > 0;
	const hasMultiplePortfolio = portfolioSrcs.length > 1;

	return (
		<div
			ref={overlayRef}
			className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
			onClick={handleClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="popup-title"
		>
			<div
				ref={panelRef}
				className="fixed bottom-0 left-0 w-full h-[calc(100vh-60px)] overflow-y-auto bg-gradient-to-br from-neutral-900 to-neutral-950 shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					onClick={handleClose}
					className="absolute top-4 right-4 z-10 w-9 aspect-square text-3xl flex items-center justify-center rounded-full text-[#BB997E] hover:bg-[#BB997E]/5 transition-colors"
					aria-label="Sluiten"
				>
					×
				</button>

				<div className="container p-6 md:p-8">
					<h2 id="popup-title" className="text-lg md:text-2xl font-bold text-[#BB997E] mb-2 pr-10">
						{project.title}
					</h2>
					<p className="text-[#BB997E]/90 mb-6 max-w-[130ch]">{project.text}</p>

					{(hasVideo || hasFigma || hasPortfolio) && (
						<div className="rounded-lg overflow-hidden border border-white/10 bg-black/30 aspect-video w-full min-h-[280px] max-h-[50vh]">
							{hasVideo && (
								<video
									key={videoSrc}
									src={videoSrc}
									controls
									muted
									className="w-full h-full object-contain"
									playsInline
									type="video/mp4"
									preload="metadata"
								/>
							)}
							{hasFigma && !hasVideo && (
								<iframe
									style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
									className="w-full h-full min-h-[280px]"
									title={`Figma: ${project.title}`}
									width="800"
									height="450"
									src={figmaEmbedUrl}
									allowFullScreen
								/>
							)}
							{hasPortfolio && !hasVideo && !hasFigma && (
								<>
									{hasMultiplePortfolio ? (
										<Swiper
											spaceBetween={16}
											slidesPerView={1}
											navigation
											loop={true}
											pagination={{ clickable: true }}
											modules={[Navigation, Pagination]}
											className="w-full h-full"
										>
											{portfolioSrcs.map((src, index) => (
												<SwiperSlide key={index}>
													<img
														src={src}
														alt={`Portfolio: ${project.title} (${index + 1})`}
														className="w-full h-full object-contain"
													/>
												</SwiperSlide>
											))}
										</Swiper>
									) : (
										<img
											src={portfolioSrcs[0]}
											alt={`Portfolio: ${project.title}`}
											className="w-full h-full object-contain"
										/>
									)}
								</>
							)}
						</div>
					)}

					{hasPortfolio && (hasVideo || hasFigma) && (
						<div className="mt-4 rounded-lg overflow-hidden border border-white/10 bg-black/30 w-full">
							{hasMultiplePortfolio ? (
								<Swiper
									spaceBetween={16}
									slidesPerView={1}
									navigation
									pagination={{ clickable: true }}
									modules={[Navigation, Pagination]}
									className="w-full h-full"
								>
									{portfolioSrcs.map((src, index) => (
										<SwiperSlide key={index}>
											<img
												src={src}
												alt={`Portfolio: ${project.title} (${index + 1})`}
												className="w-full h-auto max-h-[40vh] object-contain"
											/>
										</SwiperSlide>
									))}
								</Swiper>
							) : (
								<img
									src={portfolioSrcs[0]}
									alt={`Portfolio: ${project.title}`}
									className="w-full h-auto max-h-[40vh] object-contain"
								/>
							)}
						</div>
					)}

					{links.length > 0 && (
						<div className="flex flex-wrap gap-3 mt-4">
							{links.map((item, i) => (
								<a
									key={i}
									href={item.link}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[#BB997E] hover:bg-white/5 transition-colors"
								>
									{item.linkText || "Bekijk link"} <FontAwesomeIcon icon={faArrowRight} className="-rotate-45" />
								</a>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
