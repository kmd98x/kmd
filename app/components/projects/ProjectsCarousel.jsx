"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SlideContent from "../SlideContent";
import ProjectPopup from "../ProjectPopup";
import projects from "../../data/projects";

const DRAG_CLICK_THRESHOLD_PX = 6;

export default function ProjectsCarousel() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const viewportRef = useRef(null);
    const trackRef = useRef(null);
    const loopWidthRef = useRef(0);
    const dragRef = useRef({ startX: 0, startScroll: 0 });
    const isDraggingRef = useRef(false);
    const didDragRef = useRef(false);

    const track = useMemo(() => [...projects, ...projects], []);

    const normalizeScroll = useCallback(() => {
        const viewport = viewportRef.current;
        const loopWidth = loopWidthRef.current;
        if (!viewport || loopWidth <= 0) return;

        if (viewport.scrollLeft >= loopWidth) {
            viewport.scrollLeft -= loopWidth;
            dragRef.current.startScroll -= loopWidth;
        } else if (viewport.scrollLeft < 0) {
            viewport.scrollLeft += loopWidth;
            dragRef.current.startScroll += loopWidth;
        }
    }, []);

    const handleScroll = useCallback(() => {
        normalizeScroll();
    }, [normalizeScroll]);

    const handleOpenPopup = useCallback((project) => {
        if (didDragRef.current) return;
        setSelectedProject(project);
    }, []);

    useEffect(() => {
        const trackEl = trackRef.current;
        if (!trackEl) return undefined;

        const updateLoopWidth = () => {
            loopWidthRef.current = trackEl.scrollWidth / 2;
        };

        updateLoopWidth();

        const resizeObserver = new ResizeObserver(updateLoopWidth);
        resizeObserver.observe(trackEl);

        return () => resizeObserver.disconnect();
    }, [track]);

    const handlePointerDown = (event) => {
        if (event.button !== 0) return;

        const viewport = viewportRef.current;
        if (!viewport) return;

        isDraggingRef.current = true;
        didDragRef.current = false;
        setIsDragging(true);

        dragRef.current = {
            startX: event.clientX,
            startScroll: viewport.scrollLeft,
        };

        viewport.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (!isDraggingRef.current) return;

        const viewport = viewportRef.current;
        if (!viewport) return;

        const deltaX = event.clientX - dragRef.current.startX;

        if (Math.abs(deltaX) > DRAG_CLICK_THRESHOLD_PX) {
            didDragRef.current = true;
        }

        viewport.scrollLeft = dragRef.current.startScroll - deltaX;
        normalizeScroll();
    };

    const endDrag = (event) => {
        if (!isDraggingRef.current) return;

        const viewport = viewportRef.current;
        if (viewport?.hasPointerCapture(event.pointerId)) {
            viewport.releasePointerCapture(event.pointerId);
        }

        isDraggingRef.current = false;
        setIsDragging(false);
        normalizeScroll();
    };

    if (projects.length === 0) {
        return null;
    }

    return (
        <section
            className="relative w-full py-16"
            id="projects"
            aria-label="Projecten slideshow"
        >
            <div className="container mb-8 flex-shrink-0">
                <h2 className="relative text-montez">Mijn projecten</h2>
            </div>

            <div
                className="pointer-events-none absolute inset-0 w-full h-full z-50"
                style={{
                    background: "linear-gradient(90deg, black 0%, transparent 20%, transparent 80%, black 100%)",
                }}
            ></div>

            <div
                ref={viewportRef}
                className={`overflow-x-auto w-full px-6 py-10 select-none touch-pan-y [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"
                    }`}
                onScroll={handleScroll}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
            >
                <div
                    ref={trackRef}
                    className="flex w-max items-stretch gap-8 [&_.card-surface]:hover:scale-100"
                >
                    {track.map((project, index) => (
                        <div
                            key={`${project.id ?? index}-${index}`}
                            className="relative h-[580px] w-[300px] flex-shrink-0 md:h-[660px] md:w-[480px]"
                        >
                            <SlideContent
                                {...project}
                                project={project}
                                showCategory={false}
                                onOpenPopup={handleOpenPopup}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {selectedProject && (
                <ProjectPopup
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
}
