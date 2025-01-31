import React from "react";

export default function About() {
    return (
        <section id="about" className="container !pr-0 md:flex md:flex-row md:items-center md:py-32 relative md:h-screen">
            <img
                className="md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 -z-10 w-full max-w-3xl"
                src="/bewerktefoto2.png"
                alt="foto van KMD"
            />

            <div className="max-md:-mt-32">
                <h2 className="text-xl font-bold mb-4">Over mij</h2>
                <p className="text-[15px] md:max-w-[40ch] max-md:pr-8">
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
