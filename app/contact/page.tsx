'use client';

import React, { useState } from "react";

export default function Contact() {
    const [name, setName] = useState<string>('');

    // change event handler for textbox
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        // update state var with current value of textbox
        setName(event.target.value);
    }

    return (
        <main>
            <h1>Contact Us</h1>
            <input type="text" placeholder="Your Name" value={name} onChange={handleChange} />
            <p>You typed: {name}</p>
        </main>
    );
}