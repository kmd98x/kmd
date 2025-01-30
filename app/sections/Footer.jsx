import React from "react";
import ContactForm from "../components/ContactForm";
import LinkedIn from "../components/icons/LinkedIn";
import Instagram from "../components/icons/Instagram";
import WhatsApp from "../components/icons/WhatsApp";

export default function Footer() {
    return (
        <footer id="footer" className="container pb-12 mt-10">
            <h2 className="text-xl  font-bold mb-4">Neem contact op</h2>
            <p>Lorem ipsum dolor sit amet consectetur. Cursus vitae sapien ornare donec tincidunt feugiat.</p>

            <ContactForm />

            <div className="flex items-center gap-5 text-[#fffdd0] mt-5">
                <a href="https://linkedin.com/in/kmd98"><LinkedIn /></a>
                <a href="https://instagram.com/kmd98.x"><Instagram /></a>
                <a href="https://wa.me/15551234567"><WhatsApp /></a>
            </div>
        </footer>
    );
}

