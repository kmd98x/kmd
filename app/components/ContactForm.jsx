"use client"

import React from "react";
import { Resend } from "resend";

export default function ContactForm() {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

    const submitForm = () => {
        resend.emails.send({
            from: "onboarding@resend.dev",
            to: "kmd98x@outlook.com",
            subject: "Hello World",
            html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
        });
    };

    return (
        <form onSubmit={() => submitForm()} className="my-10 flex flex-col gap-8">
            <div className="flex flex-col items-start">
                <label for="name">Naam</label>
                <input type="text" id="name" className="w-full p-1 bg-transparent border-b border-[#fffdd0]" />
            </div>
            
            <div className="flex flex-col items-start">
                <label for="mail">Email</label>
                <input type="mail" id="mail" className="w-full p-1 bg-transparent border-b border-[#fffdd0]" />
            </div>
            
            <div className="flex flex-col items-start">
                <label for="message">Bericht</label>
                <textarea 
                    name="message" 
                    id="message" 
                    rows={3} 
                    className="w-full p-1 bg-transparent border-b border-[#fffdd0]">
                </textarea>
            </div>
        </form>
    );
}
