import React from 'react'

export default function FigmaEmbed({ url }) {
    return (
        <iframe
            src={url}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            allow="fullscreen"
        ></iframe>
    )
}