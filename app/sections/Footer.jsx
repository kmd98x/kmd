import React from "react";
import ContactForm from "../components/ContactForm";

export default function Footer() {
    return (
        <footer id="footer" className="container pb-12">
            <h2 className="text-xl font-bold mb-4">Neem contact op</h2>
            <p>Lorem ipsum dolor sit amet consectetur. Cursus vitae sapien ornare donec tincidunt feugiat.</p>

            <ContactForm />

            <div className="text-left">
                <p>📞 +31620847475</p>
                <p>📧 kmdB9x@hotmail.com</p>
                <p>📍 Amsterdam</p>

                <div className="social-media">
                    <a href="#">LinkedIn</a>
                    <a href="#">Instagram</a>
                </div>
            </div>
        </footer>
    );
}
