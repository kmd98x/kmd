import React from "react";
import ContactForm from "../components/ContactForm";

export default function Footer() {
    return (
        <footer id="footer" className="container pb-12 mt-10">
            <h2 className="text-xl  font-bold mb-4">Neem contact op</h2>
            <p>Lorem ipsum dolor sit amet consectetur. Cursus vitae sapien ornare donec tincidunt feugiat.</p>

            <ContactForm />

            <div className="text-left">
                <p className="mb-2">📞 +31620847475</p>
                <p className="mb-2">📧 kmdB9x@hotmail.com</p>
                <p>📍 Amsterdam</p>

                <div className="flex items-center gap-2 text-[#fffdd0] mt-5">
                    <a href="#">LinkedIn</a>
                    <a href="#">Instagram</a>
                </div>
            </div>
        </footer>
    );
}
