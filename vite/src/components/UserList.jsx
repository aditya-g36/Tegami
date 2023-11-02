import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleProfileClick = (user) => {
    setSelectedUser(user);
    navigate(`/profile/${user.id}`);
  };
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex">
        <ul className=" list-none">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex mb-4"
              onClick={() => handleProfileClick(user)}
              style={{ cursor: "pointer" }}
            >
              <div className="mr-3">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden"
                  style={{ width: "48px", height: "48px" }}
                >
                  <img
                    src={user.profileimg}
                    alt={`${user.username}'s Profile`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="font-bold text-lg text-white">
                  {user.first_name} {user.last_name}
                </div>
                <div className="text-base text-slate-400	">@{user.username}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
