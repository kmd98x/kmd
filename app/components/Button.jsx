import React from "react";

export default function Button({ link, type, text }) {
    return (
        <>
            {type === 'link' ? (
                <a 
                href={link} 
                className="bg-[#FFFDD0] inline-block text-black border-0 py-2 px-4 mt-5 rounded-md cursor-pointer">
                
                {text}
            </a>
            ) : (
                <button 
                    type={type} 
                    className="bg-[#FFFDD0] text-black border-0 py-2 px-4 mt-5 rounded-md cursor-pointer">
                    
                    {text}
                </button>
            )}
        </>
    );
}
