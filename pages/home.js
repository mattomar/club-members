import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import ClubMessageForm from "../components/message";
import MessageList from "../components/messageCard.js";
import "../src/styles/messageCard.css";
import React from "react";
export default function HomePage() {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const isAdmin = user?.roleId === 3; // ✅ Check if user is admin

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded user:", decoded);
                setUser(decoded);
            } catch (error) {
                console.error("Invalid token:", error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    
        fetchMessages();
    }, []);
    

    const fetchMessages = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/messages");
            if (!response.ok) throw new Error("Failed to fetch messages");

            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async (content) => {
        if (!user) return;
    
        const senderId = user.userId || user.id;
    
        try {
            const response = await fetch("http://localhost:5001/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ content, senderId }),
            });
    
            if (!response.ok) throw new Error("Failed to send message");
    
            // ✅ Instead of updating the array manually, re-fetch messages
            fetchMessages(); 
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const handleDeleteMessage = async (id) => {
        console.log(`Attempting to delete message with ID: ${id}`);
    
        try {
            const response = await fetch(`http://localhost:5001/api/messages/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            const data = await response.json();
            console.log("Delete response:", data);
    
            if (!response.ok) throw new Error(data.error || "Failed to delete");
    
            // ✅ Update state and log the new messages array
            setMessages((prevMessages) => {
                const updatedMessages = prevMessages.filter((msg) => msg.id !== id);
                console.log("Updated messages after delete:", updatedMessages);
                return updatedMessages;
            });
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="center-text">Club Messages</h1>
            
            {!user && <h2 className="center-text">Welcome, Guest! You have limited access.</h2>}
            
            {user ? (
                <div className="form-container">
                    <ClubMessageForm onSend={handleSendMessage} />
                </div>
            ) : (
                <p className="guest-message center-text">Sign in to post a message.</p>
            )}
    
            <div className="messages-container">
                <MessageList messages={messages} user={user} isAdmin={isAdmin} onDelete={handleDeleteMessage} />
            </div>
        </div>
    );
}