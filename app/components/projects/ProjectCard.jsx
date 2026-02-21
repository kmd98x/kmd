import React from 'react'
import Image from 'next/image'

export default function ProjectCard({
    project,
    index = 0,
    total = 1,
    activeIndex = 0,
    offsetX = 0,
    onSelect,
}) {
    const offsetY = index * 12
    const isActive = index === activeIndex
    const zIndex = index + 1
    const activeOffsetX = isActive ? -148 : 0

    return (
        <div
            className="absolute left-1/2 top-0 select-none cursor-pointer"
            style={{
                transform: `translateX(calc(-100% + ${offsetX}px)) translateY(${offsetY}px)`,
                zIndex,
                transition: 'transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
            onClick={() => onSelect && onSelect(index)}
        >
            <div
                style={{
                    transform: `translateX(${activeOffsetX}px)`,
                    transition: 'transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)',
                }}
                className={`rounded-2xl aspect-[4/2.5] h-[350px] max-w-full ${isActive ? 'border-red-500' : 'border-neutral-900'}`}
            >
                <Image
                    src={`/projects/${project.thumbnail}`}
                    alt={project.title}
                    width={960}
                    height={960}
                    className="w-full h-full object-cover rounded-xl pointer-events-none"
                />
            </div>
        </div>
    )
}
