import React from "react";
import { IoIosSend } from "react-icons/io";

export default function Type() {
  return (
    <>
      <div className="flex space-x-3 h-[8vh] text-center bg-gray-800 ">
        <div className="w-[70%] mx-4 ">
          <input
            type="text"
            placeholder="Type here"
            className="border-[1px] py-3 px-3 border-gray-700 rounded-xl bg-slate-700 flex items-center  w-full grow outline-none mt-2 "
          />
        </div>
        <button className="text-3xl">
          <IoIosSend />
        </button>
      </div>
    </>
  );
}
