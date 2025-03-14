import { useState } from "react";
import Button from "./ui/button";
import Input from "./ui/input";
import React from "react";
export default function ClubMessageForm({ onSend }) { // ✅ Accept onSend as a prop
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!onSend) {
            console.error("onSend is not defined!"); // ✅ Debugging log
            return;
        }
        console.log("Submit button clicked, sending:", content); // ✅ Debugging log
        
        onSend(content);
        setContent(""); // ✅ Clear input after sending
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type a message"
            />
            <button type="submit">Send</button>
        </form>
    );
}