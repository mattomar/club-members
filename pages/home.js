import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ClubMessageForm from "../components/message";
import MessageList from "../components/messageCard.js";
import "../src/styles/messageCard.css";
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
            } catch (error) {
                console.error("Invalid token:", error);
                setUser(null);
            }
        } else {
            setUser(null);
        }

        fetchMessages(); // Fetch messages regardless of login status
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch("http://localhost:5008/api/messages");
            if (!response.ok) throw new Error("Failed to fetch messages");

            const data = await response.json();
            console.log("Fetched Messages:", data);
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async (content) => {
        if (!user) {
            console.log("Guest users cannot send messages.");
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
            
            {/* Show guest message */}
            {!user && <h2>Welcome, Guest! You have limited access.</h2>}
            
            {/* Show form only if user is logged in */}
            {user ? (
                <div className="form-container">
                    <ClubMessageForm onSend={handleSendMessage} />
                </div>
            ) : (
                <p className="guest-message">Sign in to post a message.</p>
            )}
    
            {/* Show messages to everyone */}
            <div className="messages-container">
                <MessageList messages={messages} />
            </div>
        </div>
    );
}