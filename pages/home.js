import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ClubMessageForm from "../components/message";
import MessageList from "../components/messageCard.js";
import React from "react";

export default function HomePage() {
    const [user, setUser] = useState(null);
    const [receiverId, setReceiverId] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
                setReceiverId(decoded.roleId);
                fetchMessages();
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch("http://localhost:5008/api/messages", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
    
            if (!response.ok) throw new Error("Failed to fetch messages");
    
            const data = await response.json();
            console.log("Fetched Messages:", data); // Debugging
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async (content) => {
        if (!user) {
            console.log("User is not logged in, cannot send message.");
            return;
        }

        const newMessage = {
            content,
            senderId: user.userId,
            receiverId,
        };

        try {
            const response = await fetch("http://localhost:5008/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(newMessage),
            });

            if (!response.ok) throw new Error("Failed to send message");

            console.log("Message sent successfully!");
            fetchMessages();
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="container">
            <h1>Club Messages</h1>
            <div className="form-container">
                <ClubMessageForm onSend={handleSendMessage} />
            </div>
            <div className="messages-container">
                <MessageList messages={messages} />
            </div>
        </div>
    );
}