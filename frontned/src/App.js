import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

function App() {
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat message", { message });
    setMessage("");
  };

  useEffect(() => {
    // Handle incoming chat messages
    const handleChatMessage = (payload) => {
      console.log(payload.message);
      setChats((prevChats) => [...prevChats, payload.message]);
    };

    socket.on("chat message", handleChatMessage);

    // Clean up the socket event listener when the component unmounts
    return () => {
      // socket.disconnect();
      socket.off("chat message", handleChatMessage);
    };
  }, []); // Add socket to the dependency array to prevent unnecessary re-renders

  return (
    <>
      {chats.map((chat, index) => (
        // Use the index as the key to avoid React warnings
        <h1 key={index}>{chat}</h1>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">send</button>
      </form>
    </>
  );
}

export default App;
