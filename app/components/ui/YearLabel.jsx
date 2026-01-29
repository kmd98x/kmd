import React from 'react'

export default function YearLabel({ year, hasTail = false, isReached = false, isActive = false, tailProgress = 0 }) {
    return (
        <div className='flex items-start gap-4 -mt-12'>
            <div className='flex h-full flex-col items-center justify-center'>
                <span
                    className={`inline-block w-10 h-10 rounded-full transition-all duration-300 ${
                        isReached ? 'bg-white' : 'border-2 border-white/50 bg-transparent'
                    } ${isActive ? 'ring-2 ring-[#FFFDD0] ring-offset-2 ring-offset-black' : ''}`}
                />
                {hasTail && (
                    <div className="relative w-px h-8">
                        <span className="absolute left-0 top-0 w-px h-full bg-white/50" />
                        <span
                            className="absolute left-0 top-0 w-px bg-white transition-all duration-300"
                            style={{ height: `${Math.min(1, Math.max(0, tailProgress)) * 100}%` }}
                        />
                    </div>
                )}
            </div>

            <p className={`flex items-start gap-2 whitespace-nowrap text-2xl mt-1 transition-opacity duration-300 ${!isReached ? 'opacity-50' : ''}`}>{year}</p>
        </div>
    );
}