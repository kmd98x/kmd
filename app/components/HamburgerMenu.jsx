import React from 'react'

export default function hamburgermenu({links, isOpen}) {
  return (
    <nav className={`fixed size-full bg-black/50 backdrop-blur top-0 ${isOpen ? "left-0" : "left-[-100%]"}`}>
        <ul className='pt-10'>
            
            <li><a className='text-[#FFFDD0] inline-block p-5' href="">{links[0]}</a></li>
            <li><a className='text-[#FFFDD0] inline-block p-5' href="">{links[1]}</a></li>
            <li><a className='text-[#FFFDD0] inline-block p-5' href="">{links[2]}</a></li>
            <li><a className='text-[#FFFDD0] inline-block p-5' href="">{links[3]}</a></li>
        </ul>
    </nav>
  )
}
