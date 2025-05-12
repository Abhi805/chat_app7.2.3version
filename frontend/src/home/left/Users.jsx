import React from "react";
import User from "./User";
import userGetAllUsers from "../../context/userGetAllUsers";

export default function Users() {
const [allUser, loading] = userGetAllUsers();

if (loading) return <p>Loading...</p>;

return (
  <div className="py-2 overflow-y-auto" style={{maxHeight: "calc(84vh - 1vh"}} >
    {Array.isArray(allUser) && allUser.map((user, index) => (
      <User key={index} user={user} />
    ))}
  </div>
);

}
