import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Chat = () => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/chat", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setChats(response.data);
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };
        fetchChats();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Chat Room</h2>
            <ul className="list-group">
                {chats.map(chat => (
                    <li key={chat._id} className="list-group-item">
                        <Link to={`/chat/${chat._id}`}>{chat.title || chat.participants.join(", ")}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;
