"use client";

import React from "react";

// import { Resend } from "resend";
import Button from "./Button";

export default function ContactForm() {
    // const [state, action, isPending] = useActionState();
    // console.log(state);
    
    return (
        <form
            // action={action}
            className="my-10 flex flex-col items-start gap-8"
        >
            <div className="flex flex-col w-full items-start">
                <label htmlFor="name">Naam</label>
                <input
                    type="text"
                    id="name"
                    className="w-full p-1 bg-transparent border-b-[0.5px] border-[#fffdd0]/50"
                />
            </div>

            <div className="flex flex-col w-full items-start">
                <label htmlFor="mail">Email</label>
                <input
                    type="mail"
                    id="mail"
                    className="w-full p-1 bg-transparent border-b border-[#fffdd0]/50"
                />
            </div>

            <div className="flex flex-col w-full items-start">
                <label htmlFor="message">Bericht</label>
                <textarea
                    name="message"
                    id="message"
                    rows={3}
                    className="w-full p-1 bg-transparent border-b border-[#fffdd0]/50 active:outline-none"
                ></textarea>
            </div>

            <Button type="submit" text="Verstuur" />
        </form>
    );
}
