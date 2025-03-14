import React from "react";
const MessageList = ({ messages = [] }) => {
  if (!Array.isArray(messages)) {
    console.error("Invalid messages data:", messages);
    return <p>Error loading messages</p>;
  }

  return (
    <div className="message-list">
      {messages.length > 0 ? (
        messages.map(({ id, sender, content, createdAt }) => {
          const formattedDate = createdAt
            ? new Date(createdAt).toLocaleString()
            : "Just now";

          const displayName = sender
            ? `${sender.firstName} ${sender.lastName}`
            : "Unknown User";

          return (
            <div key={id} className="message-card">
              <div className="message-header">
                <div className="message-icon">{displayName[0]?.toUpperCase() || "?"}</div>
                <span className="message-name">{displayName}</span>
              </div>
              <p className="message-content">{content || "No content available"}</p>
              <span className="message-time">{formattedDate}</span>
            </div>
          );
        })
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
};

export default MessageList;