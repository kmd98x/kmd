import React from 'react'
import Image from 'next/image'

export default function ProjectCard({ project, index = 0, total = 1, radius = 180 }) {
    // Arrange cards in a 3D ring around the Y-axis
    const angle = total > 0 ? (index / total) * 360 : 0

    return (
        <div
            className="p-6 border border-neutral-900 rounded-2xl bg-neutral-950 w-[420px] max-w-full absolute left-1/2 top-1/2 transition-transform duration-300 ease-out select-none"
            style={{
                transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                zIndex: index,
            }}
        >
            <Image
                src={`/projects/${project.image}`}
                alt={project.title}
                width={840}
                height={560}
                className="w-full h-auto rounded-xl pointer-events-none"
            />
        </div>
    )
}
