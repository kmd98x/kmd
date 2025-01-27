import React from 'react'

export default function hamburgermenu({links, isOpen}) {
  return (
    <nav className={`fixed size-full bg-black/50 backdrop-blur transition-all duration-1000 z-20 top-0 ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 "}`}>
        <ul className='pt-10'>
            
            <li><a className='text-[#FFFDD0] inline-block p-5' href="">{links[0]}</a></li>
            <li><a className='text-[#FFFDD0] inline-block p-5' href="">{links[1]}</a></li>
            <li><a className='text-[#FFFDD0] inline-block p-5' href="">{links[2]}</a></li>
            <li><a className='text-[#FFFDD0] inline-block p-5' href="">{links[3]}</a></li>
        </ul>
    </nav>
  )
}
