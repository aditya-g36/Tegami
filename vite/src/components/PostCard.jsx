import React, { useState, useContext, useRef, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import IconButton from "@mui/material/IconButton";
import PostContext from "../context/PostContext";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { LuMessageSquare } from "react-icons/lu";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "../App.css";
import { Navigation } from "swiper/modules";

const PostCard = (props) => {
  const [open, setOpen] = useState(true);
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
        <div style={{ width: "400px", height: "300px" }}>
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
        </div>
        <div>
          <div className="flex items-center justify-between text-gray-700 px-1">
            <div className="flex ">
              <IconButton
                variant="plain"
                color="neutral"
                size="sm"
                onClick={handleClick}
              >
                {like ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>

              <IconButton variant="plain" color="neutral" size="sm">
                <LuMessageSquare />
              </IconButton>
            </div>
            <IconButton variant="plain" color="neutral" size="sm">
              <BookmarkBorderRoundedIcon />
            </IconButton>
          </div>
          <div
            className="text-gray-700 "
            style={{
              fontSize: "smaller",
              marginTop: "-10px",
              paddingLeft: "20px",
            }}
          >
            {numoflikes}
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
