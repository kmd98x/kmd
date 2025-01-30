import React from "react";

export default function About() {
    return (
        <section id="about" className="md:flex md:flex-row-reverse md:items-center md:py-32relative">
            <img
                className="md:max-w-3xl md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 -z-10"
                src="/bewerktefoto2.png"
                alt="foto van KMD"
            />

            <div className="max-md:-mt-32 md container">
                <h2 className="text-xl font-bold mb-4">Over mij</h2>
                <p className="text-[15px] md:max-w-[60ch]">
                    Ik ben Martina Doekharan, 2e jaars student Communication and
                    Multimedia Design aan de Hogeschool van Amsterdam. Mijn
                    passie ligt in het ontwikkelen van digitale producten die de
                    gebruikerservaring verbeteren. Binnen mijn studie focus ik
                    me op UX-design, een vakgebied dat mij zowel creatief als
                    technisch uitdaagt.
                </p>
            </div>
        </section>
    );
}
