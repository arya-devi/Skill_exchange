import React from "react";
import "./chatMessage.css";

const ChatMessage = ({ message, currentUserId, onEdit, onDelete }) => {
  const isSender = message.sender._id === currentUserId;

  const handleEdit = () => {
    const updatedContent = prompt("Edit your message:", message.content);
    if (updatedContent) {
      onEdit(message._id, updatedContent);
    }
  };

  return (
    <div className="message-container">
      <div className={`message-wrapper ${isSender ? "sender" : "recipient"}`}>
        <div className={`message ${isSender ? "sender-bubble" : "recipient-bubble"}`}>
          <div>{message.content}</div>
          <span className="message-timestamp">
            {new Date(message.createdAt).toLocaleTimeString()}
          </span>
        </div>

        {/* Edit and Delete buttons outside the message box */}
        {isSender && (
          <div className="message-actions">
            <button onClick={handleEdit} className="btn btn-outline-primary me-2">
              <i className="bi bi-pencil"></i>
            </button>
            <button onClick={() => onDelete(message._id)} className="btn btn-outline-danger">
              <i className="bi bi-trash"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
