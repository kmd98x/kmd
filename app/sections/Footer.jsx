import React from "react";
import LinkedIn from "../components/icons/LinkedIn";
import Instagram from "../components/icons/Instagram";
import WhatsApp from "../components/icons/WhatsApp";
import Envelope from "../components/icons/Envelope";

export default function Footer() {
    return (
        <footer id="footer" className="container pb-12">
            <div className="mb-10 border-t border-[#fffdd0]/15"></div>
            <h2 className="text-xl  font-bold mb-4">Neem contact op</h2>
            <p className="max-w-[58ch]">Geïnteresseerd in mijn werk? Neem gerust contact op via het onderstaande e-mail adres of telefoonnummer.</p>

            <a href="mailto:kmd98x@hotmail.com" className="text-[#fffdd0] flex items-center gap-2 mt-5">
                <Envelope />
                kmd98x@hotmail.com
            </a>
            
            <a href="https://wa.me/620847475" className="text-[#fffdd0] flex items-center gap-2 mt-2">
                <WhatsApp />
                +31 6 20847475
            </a>
            
            <div className="flex items-center gap-5 text-[#fffdd0] mt-5">
                <a href="https://linkedin.com/in/kmd98"><LinkedIn /></a>
                <a href="https://instagram.com/kmd98.x"><Instagram /></a>
            </div>
        </footer>
    );
}

