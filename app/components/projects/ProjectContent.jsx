import React from 'react'
import Image from 'next/image'

export default function ProjectContent({ project }) {
    return (
        <div>
            <div className='h-[200px] flex items-center justify-start'>
                <h3 className='text-white text-lg'>{project.title}</h3>
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
