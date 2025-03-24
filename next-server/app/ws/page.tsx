'use client';


import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");

  // Open WebSocket connection when the page loads
  const ws = new WebSocket("https://miniature-space-halibut-5g4vx75qr95gf7ggj-8080.app.github.dev/");

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onmessage = (event) => {
    console.log("Message from server:", event.data);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      ws.send(inputText); // Send text to WebSocket server
      setInputText("");    // Clear the input field
    }
  };

  return (
    <div>
      <h1>WebSocket Text Sender</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
