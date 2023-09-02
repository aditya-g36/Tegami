import React, { useContext } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PostContext from "../context/PostContext";

const ProfileImageList = (props) => {
  return (
    <ImageList sx={{ width: 900, height: 450 }} cols={4} rowHeight={164}>
      {props.data.images.map((item) => (
        <ImageListItem key={item.image}>
          <img
            src={`${
              "http://127.0.0.1:8000/" + item.image
            }?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${
              "http://127.0.0.1:8000/" + item.image
            }?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.caption}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ProfileImageList;
