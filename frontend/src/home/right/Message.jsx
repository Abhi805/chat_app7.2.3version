import React from "react";

export default function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("messngaer"));
  const items = message.senderId === authUser.user._id;
  const chatName = items ? "chat-end" : "chat-start";
  const chatColor = items ? "bg-blue-400" : "bg-gray-600";

  return (
    <div className="p-4">
      <div className={`chat ${chatName}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {message.message} {/* 👈 fixed this line */}
        </div>
      </div>
    </div>
  );
}
