
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import ChatMessage from "./ChatMessage";
import Navbar from "../components/Navbar";

const ChatRoom = ({ chatId }) => {
  const senderId = localStorage.getItem('userId');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef(null);

  // Initialize the socket connection and set up listeners
  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.current.on("messageEdited", (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg._id === updatedMessage._id ? updatedMessage : msg))
      );
    });

    socket.current.on("messageDeleted", (messageId) => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId));
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Fetch message history for the chat room
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/message/${chatId}/history`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, [chatId]);

  // // Send a new message
  // const handleSendMessage = async () => {
  //   const messageData = { chatId, sender: senderId, content: newMessage };
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/message/send", messageData, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  //     });
  //     const newMsg = response.data;
  //     setMessages((prevMessages) => [...prevMessages, newMsg]); // Update local state immediately
  //     socket.current.emit("sendMessage", newMsg); // Notify other users
  //     setNewMessage("");
  //   } catch (error) {
  //     console.error('Error sending message:', error);
  //   }
  // };

  const handleSendMessage = async () => {
  const messageData = { chatId, sender: senderId, content: newMessage };
  try {
    const response = await axios.post("http://localhost:5000/api/message/send", messageData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    const newMsg = response.data;
    setMessages((prevMessages) => [...prevMessages, newMsg]); // Update local state immediately
    socket.current.emit("sendMessage", newMsg); // Notify other users
    setNewMessage("");
    window.location.reload(); // Refresh the page
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

  // Edit an existing message
  const handleEditMessage = async (messageId, updatedContent) => {
    const updatedMessageData = { content: updatedContent };
    try {
      const response = await axios.put(`http://localhost:5000/api/message/${messageId}`, updatedMessageData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const updatedMsg = response.data;
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg._id === updatedMsg._id ? updatedMsg : msg))
      ); // Update local state immediately
      socket.current.emit("editMessage", updatedMsg); // Notify other users
    } catch (error) {
      console.error('Error editing message:', error);
    }
  };

  // Delete a message
  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`http://localhost:5000/api/message/${messageId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== messageId)); // Update local state immediately
      socket.current.emit("deleteMessage", messageId); // Notify other users
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div>
                   <Navbar />
                   <div className="container mt-4">
      <h2 className="mb-4">Chat Room</h2>
      <div className="border rounded p-3 mb-3" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
        {messages.map((message) => (
          <ChatMessage
            key={message._id}
            message={message}
            currentUserId={senderId}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
          />
        ))}
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
    </div>
    
  );
};

export default ChatRoom;
