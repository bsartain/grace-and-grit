"use client";

export default function ChatBubble() {
  const handleClick = () => {
    alert("Chat with us! (Connect your chatbot here)");
    // Later: open Tidio, Intercom, Crisp, etc.
  };

  return (
    <div className="chat-bubble" onClick={handleClick} role="button" aria-label="Open chat">
      <i className="bi bi-chat-dots"></i>
    </div>
  );
}
