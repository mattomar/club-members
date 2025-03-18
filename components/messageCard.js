import React from "react";
const MessageList = ({ messages = [], user, isAdmin, onDelete }) => {
  if (!Array.isArray(messages)) {
    console.error("Invalid messages data:", messages);
    return <p>Error loading messages</p>;
  }

  return (
    <div className="message-list">
      {messages.length > 0 ? (
        messages.map(({ id, sender, content, createdAt }) => {
          const senderId = sender?.id || sender?.userId; // Make sure sender ID is retrieved correctly
          const userId = user?.id || user?.userId; // Make sure user ID is retrieved correctly
          const isMessageOwner = senderId === userId; // Check if the message belongs to the logged-in user
          const showDetails = isAdmin || isMessageOwner; // Show details only if admin or message owner

          const displayName = showDetails
            ? sender && sender.firstName
              ? `${sender.firstName} ${sender.lastName}`
              : "Unknown User"
            : "Unknown";

          const formattedDate = showDetails
            ? createdAt
              ? new Date(createdAt).toLocaleString()
              : "Just now"
            : ""; // Hide timestamp for non-admins/non-owners

          return (
            <div key={id} className="message-card">
              <div className="message-header">
                <div className="message-icon">
                  {displayName[0]?.toUpperCase() || "?"}
                </div>
                <span className="message-name">{displayName}</span>
              </div>
              <p className="message-content">{content || "No content available"}</p>
              {formattedDate && <span className="message-time">{formattedDate}</span>}

              {/* 🔹 Show delete button only if user is an admin */}
              {isAdmin && (
                <button
                  className="delete-button"
                  aria-label={`Delete message from ${displayName}`}
                  onClick={() => onDelete(id)}
                >
                  Delete
                </button>
              )}
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