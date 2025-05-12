import React from "react";
import useConversation from "../../statemanage/useConversation.js";

export default function User({ user }) {
  const { selectedConversation, setSelectedConversaton } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversaton(user)}
    >
      <div className="flex space-x-5 px-6 py-7 hover:bg-slate-600 duration-300 cursor-pointer ">
        <div className="avatar avatar-online">
          <div className="w-14 rounded-full">
            <img
              src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
              alt="images"
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold" style={{ cursor: "pointer" }}>
            {user.name}
          </h1>
          <span>{user.email}</span>
        </div>
      </div>
    </div>
  );
}
