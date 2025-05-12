import React from "react";
import useConversation from "../../statemanage/useConversation.js";

export default function Chatuser() {
  const {selectedConversation} = useConversation();
  console.log(selectedConversation)
  return (
    <div >
      <div className="flex p-5 space-x-4 h-[10vh] bg-gray-900 hover:bg-slate-600 duration-300 "  >
        <div className="avatar avatar-online">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
          </div>
        </div>
        <div>
          <h1 className="text-xl" >{selectedConversation}</h1>
          <span className="text-sm" >Online</span>
        </div>
      </div>
    </div>
  );
}
