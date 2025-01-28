import React from "react";
import { Resend } from "resend";

export default function ContactForm() {
    const resend = new Resend(process.env.NEXT_APP_RESENT_API_KEY);

    const submitForm = () => {
        resend.emails.send({
            from: "onboarding@resend.dev",
            to: "kmd98x@outlook.com",
            subject: "Hello World",
            html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
        });
    };

    return (
        <form onSubmit={() => submitForm()}>
            <div>ContactForm</div>
        </form>
    );
}
