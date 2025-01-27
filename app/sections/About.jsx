import React from "react";

export default function About() {
    return (
        <section id="about">
            <img
                className="w-full"
                src="/bewerktefoto2.png"
                alt="foto van KMD"
            />

            <div className="-mt-32 container">
                <h2 className="text-xl font-bold mb-4">Over mij</h2>
                <p className="text-[15px]">
                    Ik ben Martina Doekharan, 2e jaars student Communication and
                    Multimedia Design aan de Hogeschool van Amsterdam. Mijn
                    passie ligt in het ontwikkelen van digitale producten die de
                    gebruikerservaring verbeteren. Binnen mijn studie focus ik
                    me op UX-design, een vakgebied dat mij zowel creatief als
                    technisch uitdaagt.
                </p>
                <button className="bg-[#FFFDD0] text-black border-0 py-2 px-4 mt-5 rounded-md cursor-pointer">
                    Neem contact op
                </button>
            </div>
        </section>
    );
}
