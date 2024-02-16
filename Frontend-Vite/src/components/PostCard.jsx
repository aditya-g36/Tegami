import React, { useState, useContext, useRef, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import PostContext from "../context/PostContext";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { TbBookmark } from "react-icons/tb";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { TbMessageCircle } from "react-icons/tb";

import "swiper/css";
import "swiper/css/navigation";
import "../App.css";

const PostCard = (props) => {
  const [open, setOpen] = useState(false);
  let { User } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const [numoflikes, setnumoflikes] = useState(1);
  let api = useAxios();

  let [like, setLike] = useState(() =>
    props.data ? props.data.likes.includes(user?.user_id) : false
  );

  const tempLikes = useRef(props.data?.likes);
  useEffect(() => {
    setnumoflikes(tempLikes.current.length);
  }, [tempLikes.current]);
  let updateLikes = async () => {
    let formData = new FormData();

    for (let index = 0; index < tempLikes.current.length; index++) {
      const element = tempLikes.current[index];
      formData.append("likes", element);
    }
    try {
      await api.patch(`/api/likes/${props.data?.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };
  let handleClick = () => {
    if (like) {
      let arr = [];
      for (let i = 0; i < tempLikes.current.length; i++) {
        if (tempLikes.current[i] !== user?.user_id) {
          arr.push(tempLikes.current[i]);
        }
      }

      tempLikes.current = arr;
      setLike(false);
      updateLikes();
    } else {
      const updatedLikes = [...tempLikes.current, user?.user_id];
      tempLikes.current = updatedLikes;
      setLike(true);
      updateLikes();
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col bg-[#000000]">
      <div className="grid grid-cols-1 bg-[#000000]">
        <div className="flex items-start p-2 flex space-x-3 bg-[#000000]">
          <img
            className="items-start inline-block h-10 w-10 rounded-full ring-2 ring-black"
            src={"http://127.0.0.1:8000/" + User.profileimg}
          />
          <div>
            <div className="flex flex-row text-sm font-medium">
              <div className="leading-none text-slate-50	">
                {User.first_name} {User.last_name}
              </div>
              <div className="leading-none text-slate-400">
                {"@" + User.username}
              </div>
            </div>
            <div className="flex space-x-2 ">
              <div
                className={`flex text-slate-50 text-base ${
                  open
                    ? "line-clamp-1 whitespace-normal"
                    : "truncate whitespace-normal"
                }`}
                style={{
                  wordWrap: "break-word",
                }}
              >
                <span>
                  {open
                    ? props.data.caption
                    : props.data.caption.substring(0, 50) + "..." + " "}
                  {props.data.caption.length > 50 && (
                    <button
                      className="text-slate-400"
                      onClick={() => setOpen(!open)}
                    >
                      {open ? "less" : "more"}
                    </button>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/*
        <div
          className="mx-auto"
          style={{
            width: "400px",
            height: "300px",
            border: "1px solid #333",
            borderRadius: "10px",
          }}
        >
          
        </div>
        */}
        {props.data.images.length == 1 && (
          <div className="mr-2 ml-16">
            <img
              src={"http://127.0.0.1:8000" + props.data.images[0].image}
              alt=""
              className="rounded-2xl max-h-[500px]	object-cover"
            />
          </div>
        )}

        {props.data.images.length == 2 && (
          <div className="mr-2 ml-16">
            <div className="flex flex-row space-x-0.5 ">
              <div style={{ flex: 1 }}>
                <img
                  src={"http://127.0.0.1:8000" + props.data.images[0].image}
                  alt=""
                  className="rounded-l-lg object-cover min-h-[300px]"
                />
              </div>
              <div style={{ flex: 1 }}>
                <img
                  src={"http://127.0.0.1:8000" + props.data.images[1].image}
                  alt=""
                  className="rounded-r-lg min-h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {props.data.images.length == 3 && (
          <div className="mr-2 ml-16 flex flex-row space-x-0.5">
            <div className="flex w-1/2">
              <img
                src={"http://127.0.0.1:8000" + props.data.images[0].image}
                alt=""
                className="rounded-l-lg object-cover w-full h-[258px]"
              />
            </div>

            <div className="flex flex-col w-1/2 space-y-0.5">
              <div className="flex w-full">
                <img
                  src={"http://127.0.0.1:8000" + props.data.images[1].image}
                  alt=""
                  className="rounded-tr-lg object-cover w-full h-32"
                />
              </div>
              <div className="flex w-full">
                <img
                  src={"http://127.0.0.1:8000" + props.data.images[2].image}
                  alt=""
                  className="rounded-br-lg object-cover w-full h-32"
                />
              </div>
            </div>
          </div>
        )}

        {props.data.images.length == 4 && (
          <div className="mr-2 ml-16 flex flex-col space-y-0.5">
            <div className="flex flex-row space-x-0.5">
              <div className="w-1/2">
                <img
                  src={"http://127.0.0.1:8000" + props.data.images[0].image}
                  alt=""
                  className="rounded-tl-lg max-h-[125px] object-cover w-full"
                />
              </div>
              <div className="w-1/2 rounded">
                <img
                  src={"http://127.0.0.1:8000" + props.data.images[1].image}
                  alt=""
                  className="rounded-tr-lg max-h-[125px] object-cover w-full"
                />
              </div>
            </div>
            <div className="flex flex-row rounded-t-lg space-x-0.5">
              <div className="w-1/2 ">
                <img
                  src={"http://127.0.0.1:8000" + props.data.images[2].image}
                  alt=""
                  className="rounded-bl-lg max-h-[125px] object-cover w-full"
                />
              </div>
              <div className="w-1/2 ">
                <img
                  src={"http://127.0.0.1:8000" + props.data.images[3].image}
                  alt=""
                  className="rounded-br-lg max-h-[125px] object-cover w-full"
                />
              </div>
            </div>
          </div>
        )}

        <div className="mr-2 ml-16">
          <div className="flex items-center justify-between text-slate-50">
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              onClick={handleClick}
            >
              {like ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon className="text-slate-400 group hover:text-blue-500" />
              )}
            </IconButton>

            <IconButton variant="plain" color="neutral" size="sm">
              <TbMessageCircle className="text-slate-400 group hover:text-blue-500" />
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <HiOutlineArrowUpTray className="text-slate-400 group hover:text-blue-500" />
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <TbBookmark className="text-slate-400 group hover:text-blue-500" />
            </IconButton>
          </div>
          <div
            className="text-slate-50 pl-3"
            style={{
              fontSize: "smaller",
              marginTop: "-10px",
            }}
          >
            {numoflikes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
