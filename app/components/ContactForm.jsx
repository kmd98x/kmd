"use client";

import React from "react";

import Button from "./Button";

export default function ContactForm() {

    function submitForm(formData) {
        const name = formData.get('name');
        const mail = formData.get('mail');
        const message = formData.get('message');

        console.log(name, mail, message);
    }

    return (
        <form
            action={submitForm}
            className="my-10 flex flex-col items-start gap-8"
        >
            <div className="flex flex-col w-full items-start">
                <label htmlFor="name" className="text-[#fffdd0]">Naam</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-1 bg-transparent border-b-[0.5px] border-[#fffdd0]/50 rounded-none focus:outline-none focus:ring-0 focus:border-[#fffdd0] transition"
                />
            </div>

            <div className="flex flex-col w-full items-start">
                <label htmlFor="mail" className="text-[#fffdd0]">Email</label>
                <input
                    type="mail"
                    id="mail"
                    name="mail"
                    className="w-full p-1 bg-transparent border-b border-[#fffdd0]/50 rounded-none focus:outline-none focus:ring-0 focus:border-[#fffdd0] transition"
                />
            </div>

            <div className="flex flex-col w-full items-start">
                <label htmlFor="message" className="text-[#fffdd0]">Bericht</label>
                <textarea
                    name="message"
                    id="message"
                    rows={3}
                    className="w-full p-1 bg-transparent border-b border-[#fffdd0]/50 rounded-none focus:outline-none focus:ring-0 focus:border-[#fffdd0] transition"
                ></textarea>
            </div>

            <Button type="submit" text="Verstuur" />
        </form>
    );
}
