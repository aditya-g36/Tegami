import React, { useContext } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PostContext from "../context/PostContext";

const ProfileImageList = (props) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ImageList sx={{ width: 800, height: 700 }} cols={3} rowHeight={164}>
        {props.data.map((item) => (
          <ImageListItem key={item.images}>
            <img
              srcSet={`${
                "http://127.0.0.1:8000/" + item.images[0].image
              }?w=164&h=164&fit=crop&auto=format`}
              src={`${
                "http://127.0.0.1:8000/" + item.images[0].image
              }?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.caption}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default ProfileImageList;
