import React from 'react'

export default function ProjectContent({project}) {
    return (
        <div>
            <h3 className='text-white text-lg'>{project.title}</h3>
            <p className='text-white'>{project.text}</p>
        </div>
    )
}
