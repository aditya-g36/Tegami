import React, { useState, useContext } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { GoPencil } from "react-icons/go";
import { MdOutlineDashboard, MdLogout } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CreatePost from "./CreatePost";

const sidebar = () => {
  let { user, logoutUser } = useContext(AuthContext);
  const menus = [
    { name: "home", link: "/", icon: MdOutlineDashboard },
    { name: "profile", link: `/profile/${user.user_id}`, icon: AiOutlineUser },
    { name: "messages", link: "/", icon: FiMessageSquare },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div>
      <section
        className="flex gap-6"
        style={{
          height: 50,
        }}
      >
        <div
          className={`bg-[#0e0e0e] min-h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`${
                  open
                    ? "group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                    : " py-3 flex justify-end cursor-pointer hover:bg-gray-800 rounded-md"
                }`}
                style={{ color: "#FFF" }}
              >
                <div>{React.createElement(menu?.icon, { size: "19" })}</div>
                <div
                  style={{
                    transitionDelay: `${i + 2}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </div>
                <div
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </div>
              </Link>
            ))}

            <div
              className={`${
                open
                  ? "group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                  : " py-3 flex justify-end cursor-pointer hover:bg-gray-800 rounded-md"
              }`}
            >
              <div>{React.createElement(GoPencil, { size: "19" })}</div>
              <div
                style={{
                  transitionDelay: `${7}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                <CreatePost />
              </div>
            </div>

            <Link to="/login" onClick={logoutUser} style={{ color: "#FFF" }}>
              <div
                className={`${
                  open
                    ? "group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                    : " py-3 flex justify-end cursor-pointer hover:bg-gray-800 rounded-md"
                }`}
              >
                <div>{React.createElement(MdLogout, { size: "19" })}</div>
                <div
                  style={{
                    transitionDelay: `${8}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  LogOut
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default sidebar;
