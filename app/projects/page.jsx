"use client";

import React, { useRef, useState } from 'react'
import projects from "../data/projects.json"
import ProjectCard from '../components/projects/ProjectCard'
import ProjectContent from '../components/projects/ProjectContent';

export default function page() {
    const [currentProject, setCurrentProject] = useState("");
    const [rotation, setRotation] = useState(0)

    const isDragging = useRef(false)
    const dragStartX = useRef(0)
    const dragStartRotation = useRef(0)

    const handlePointerDown = (event) => {
        isDragging.current = true
        dragStartX.current = event.clientX
        dragStartRotation.current = rotation
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    const handlePointerMove = (event) => {
        if (!isDragging.current) return

        const deltaX = event.clientX - dragStartX.current
        const sensitivity = 0.3 // degrees per pixel
        setRotation(dragStartRotation.current + deltaX * sensitivity)
    }

    const handlePointerUp = (event) => {
        if (!isDragging.current) return

        isDragging.current = false
        event.currentTarget.releasePointerCapture(event.pointerId)
    }

    return (
        <article className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <section>
                {projects.map((project, index) => (
                    <ProjectContent key={index} project={project} />
                ))}
            </section>

            <section className="relative min-h-[420px] flex items-center justify-center perspective-[1200px]">
                <div
                    className="relative w-[520px] h-[520px]"
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateY(${rotation}deg)`,
                        cursor: isDragging.current ? 'grabbing' : 'grab',
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                >
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            project={project}
                            index={index}
                            total={projects.length}
                            radius={240}
                        />
                    ))}
                </div>
            </section>
        </article>
    )
}