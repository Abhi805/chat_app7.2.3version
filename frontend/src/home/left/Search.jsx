import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Search() {
  return (
    <div className="h-[12vh] ps-8 " >
      <div className="flex">
        {" "}
        <label className="border-[1px] p-2 rounded-lg bg-slate-700 flex items-center gap-2 w-[80%] ">
          <input
            type="search"
            className="grow outline-none bg-slate-700 "
            required
            placeholder="Search"
          />
        </label>
        <button>
          <CiSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
        </button>
      </div>
    </div>
  );
}
