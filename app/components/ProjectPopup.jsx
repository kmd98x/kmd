"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

function getFigmaEmbedUrl(link, slug) {
	if (!link || !link.includes("figma.com") || !slug) return null;
	try {
		const url = new URL(link);
		const embedHost = `embed_host=${encodeURIComponent(slug)}`;
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
	if (!project) return null;

	const links = Array.isArray(project.links) ? project.links.filter((l) => l && typeof l.link === "string" && l.link.trim()) : [];
	const embedLink = typeof project.embed === "string" && project.embed.trim() ? project.embed.trim() : null;
	const figmaEmbedUrl = getFigmaEmbedUrl(embedLink, project.slug);
	const videoSrc = typeof project.video === "string" && project.video.trim() ? project.video.trim() : null;
	const hasVideo = !!videoSrc;
	const hasFigma = !!figmaEmbedUrl;
	const portfolioSrc = typeof project.portfolio === "string" && project.portfolio.trim() ? `/projects/${project.portfolio.trim()}` : null;
	const hasPortfolio = !!portfolioSrc;

	useEffect(() => {
		const handleEscape = (e) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", handleEscape);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [onClose]);

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="popup-title"
		>
			<div
				className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#fffdd0]/20 bg-gradient-to-br from-neutral-900 to-neutral-950 shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 z-10 w-9 aspect-square text-3xl flex items-center justify-center rounded-full text-[#fffdd0] hover:bg-[#fffdd0]/5 transition-colors"
					aria-label="Sluiten"
				>
					×
				</button>

				<div className="p-6 md:p-8">
					<h2 id="popup-title" className="text-2xl font-bold text-[#fffdd0] mb-2 pr-10">
						{project.title}
					</h2>
					<p className="text-[#fffdd0]/90 mb-6 max-w-[130ch]">{project.text}</p>

					{(hasVideo || hasFigma || hasPortfolio) && (
						<div className="rounded-lg overflow-hidden border border-white/10 bg-black/30 aspect-video w-full min-h-[280px]">
							{hasVideo && (
								<video
									key={videoSrc}
									src={videoSrc}
									controls
									muted
									className="w-full h-full object-contain"
									playsInline
									preload="metadata"
								/>
							)}
							{hasFigma && !hasVideo && (
								<iframe 
									style={{border: "1px solid rgba(0, 0, 0, 0.1)"}} 
									className="w-full h-full min-h-[280px]"
									title={`Figma: ${project.title}`}
									width="800" 
									height="450" 
									src={figmaEmbedUrl} 
									allowFullScreen 
								/>
							)}
							{hasPortfolio && !hasVideo && !hasFigma && (
								<img
									src={portfolioSrc}
									alt={`Portfolio: ${project.title}`}
									className="w-full h-full object-contain"
								/>
							)}
						</div>
					)}

					{hasPortfolio && (hasVideo || hasFigma) && (
						<div className="mt-4 rounded-lg overflow-hidden border border-white/10 bg-black/30 w-full">
							<img
								src={portfolioSrc}
								alt={`Portfolio: ${project.title}`}
								className="w-full h-auto max-h-[70vh] object-contain"
							/>
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
									className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[#fffdd0] hover:bg-white/5 transition-colors"
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
