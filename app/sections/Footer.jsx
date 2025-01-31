import React from "react";
import LinkedIn from "../components/icons/LinkedIn";
import Instagram from "../components/icons/Instagram";
import WhatsApp from "../components/icons/WhatsApp";
import Envelope from "../components/icons/Envelope";

export default function Footer() {
    return (
        <footer id="footer" className="container pb-12 flex items-center">
            <div className="w-full">
                <div className="mb-10 border-t border-[#fffdd0]/15"></div>
                <h2 className="text-xl text-center font-bold mb-4">Neem contact op</h2>
                <p className="max-w-[58ch] text-center mx-auto">Geïnteresseerd in mijn werk? Neem gerust contact op via het onderstaande e-mail adres of telefoonnummer.</p>
    
                <div className="flex items-center flex-wrap mt-5 gap-12 justify-center">
                    <a href="mailto:kmd98x@hotmail.com" className="text-[#fffdd0] flex flex-col items-center gap-1 mt-1">
                        <Envelope />
                        <h4 className="text-lg leading-none mt-2">Email</h4>
                        kmd98x@hotmail.com
                    </a>
                    
                    <a href="https://wa.me/620847475" className="text-[#fffdd0] flex flex-col items-center gap-1 mt-1">
                        <WhatsApp />
                        <h4 className="text-lg leading-none mt-2">WhatsApp</h4>
                        +31 6 20847475
                    </a>
                </div>
                
                <div className="flex justify-center items-center gap-5 text-[#fffdd0] mt-10">
                    <a href="https://linkedin.com/in/kmd98"><LinkedIn /></a>
                    <a href="https://instagram.com/kmd98.x"><Instagram /></a>
                </div>
            </div>
        </footer>
    );
}

