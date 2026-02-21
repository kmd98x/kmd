import React from 'react'
import Image from 'next/image'

export default function ProjectContent({ project }) {
    return (
        <div>
            <div className='flex items-center justify-start pl-20'>
                <h3 className='text-white text-2xl'>{project.title}</h3>
            </div>

            <Image src={`/projects/${project.image}`} alt={project.title} width={500} height={500} />

            <p className='text-white'>{project.text}</p>

            {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer">{project.linkText}</a>
            ) : (
                <></>
            )}
        </div>
    )
}
