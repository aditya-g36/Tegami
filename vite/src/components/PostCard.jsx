import React, { useState, useContext } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import IconButton from "@mui/material/IconButton";
import PostContext from "../context/PostContext";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../App.css";
import { Navigation } from "swiper/modules";

const PostCard = (props) => {
  const [open, setOpen] = useState(true);
  let { User } = useContext(PostContext);

  return (
    <div className="mx-auto max-w-md flex flex-col justify-center my-12 border rounded-md">
      <div className="grid grid-cols-1">
        <div className="flex items-center h-14 p-2 flex space-x-3">
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src={"http://127.0.0.1:8000/" + User.profileimg}
          />
          <div className="text-sm font-medium">
            <div className="text-gray-900 leading-none">{User.username}</div>
            <div className="text-gray-600">Aug 18</div>
          </div>
        </div>

        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          style={{
            "--swiper-navigation-color": "#FFF",
            "--swiper-navigation-size": "25px",
            backgroundColor: "black",
          }}
        >
          {props.data.images.map((itr) => (
            <SwiperSlide key={itr.id}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "black",
                }}
              >
                <img
                  src={"http://127.0.0.1:8000" + itr.image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    userSelect: "none",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div>
          <div className="flex items-center justify-between text-gray-700 px-1">
            <div className="flex ">
              <IconButton>
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton variant="plain" color="neutral" size="sm">
                <ChatBubbleOutlineRoundedIcon />
              </IconButton>
            </div>
            <IconButton variant="plain" color="neutral" size="sm">
              <BookmarkBorderRoundedIcon />
            </IconButton>
          </div>

          <div className="flex space-x-2 px-2">
            <div
              className={`text-gray-700 text-base ${open ? "truncate " : ""}`}
            >
              {props.data.caption}
            </div>
            {open && <button onClick={() => setOpen(!open)}>more</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
