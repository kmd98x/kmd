import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer id="footer" className="container pb-12 flex items-center">
            <div className="w-full">
                <span className="inline-block w-full h-px bg-[#fffdd0]/30 mb-5"></span>

                <h2 className="relative text-montez text-center mb-4">Neem contact op</h2>
                <p className="max-w-[58ch] text-center mx-auto">Geïnteresseerd in mijn werk? Neem gerust contact op via het onderstaande e-mail adres of LinkedIn.</p>
    
                <div className="flex items-center flex-wrap mt-5 gap-12 justify-center">
                    <a href="mailto:kmd98x@hotmail.com" target="_blank" className="text-[#fffdd0] flex flex-col items-center gap-1 mt-1">
                        <FontAwesomeIcon icon={faEnvelope} className="w-7" />
                        <h4 className="text-lg leading-none mt-2">Email</h4>
                        kmd98x@hotmail.com
                    </a>
                    
                    <a href="https://linkedin.com/in/kmd98" target="_blank" className="text-[#fffdd0] flex flex-col items-center gap-1 mt-1">
                        <FontAwesomeIcon icon={faLinkedinIn} className="w-7" />
                        <h4 className="text-lg leading-none mt-2">LinkedIn</h4>
                        <span className="block">Martina Doekharan</span>
                    </a>
                </div>
                
                <div className="flex justify-center items-center gap-5 text-[#fffdd0] mt-10">
                    
                </div>
            </div>
        </footer>
    );
}

