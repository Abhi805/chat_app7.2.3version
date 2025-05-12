import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import Cookies from "js-cookie";
import axios from "axios";

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const handleOut = async () => {
    setLoading(true);
    try {
   const res = await axios.post("/api/user/logout");
      localStorage.removeItem("messngaer");
      Cookies.remove("jwt");
      setLoading(true);
      alert("logout successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[4%] bg-slate-950 text-white flex flex-col justify-end ">
      <div className="p-3">
        <button>
          <AiOutlineLogout
            className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300"
            onClick={handleOut}
          />
        </button>
      </div>
    </div>
  );
}
