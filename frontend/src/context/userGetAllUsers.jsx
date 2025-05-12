import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function userGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/getUserProfile", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Extract only the array
        setAllUsers(response.data.filiteredUsers);
      } catch (error) {
        console.log("Error in userGetAllUsers: " + error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return [allUsers, loading];
}
