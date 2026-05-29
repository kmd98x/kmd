import React from "react";

export default function Button({ link, type, text }) {
    return (
        <>
            {type === 'link' ? (
                <a 
                href={link} 
                className="bg-[#BB997E] inline-block text-black border-0 py-2 px-4 mt-5 rounded-md cursor-pointer">
                
                {text}
            </a>
            ) : (
                <button 
                    type={type} 
                    className="bg-[#BB997E] text-black border-0 py-2 px-4 mt-5 rounded-md cursor-pointer">
                    
                    {text}
                </button>
            )}
        </>
    );
}
