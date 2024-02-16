import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { MDBFile } from "mdb-react-ui-kit";
import { MDBTextArea } from "mdb-react-ui-kit";

import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  let api = useAxios();
  const [open, setOpen] = React.useState(false);
  let { user } = useContext(AuthContext);

  let CreateNewPost = async (e) => {
    e.preventDefault();
    let formdata = new FormData();

    for (let i = 0; i < e.target.PostImage.files.length; i++) {
      formdata.append("uploaded_images", e.target.PostImage.files[i]);
    }

    formdata.set("caption", e.target.PostCaption.value);
    formdata.set("user_id", user.user_id);

    api.post("/api/createpost/", formdata, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="cursor-pointer">
      <div onClick={handleClickOpen}>Create</div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create new post
        </BootstrapDialogTitle>
        <form id="form" onSubmit={CreateNewPost}>
          <DialogContent dividers>
            Add photos and videos here
            <MDBFile name="PostImage" multiple="multiple" />
            <br />
            <MDBTextArea label="Caption" name="PostCaption" rows={4} />
          </DialogContent>
          <DialogActions>
            <Button autoFocus type="submit" onClick={handleClose}>
              Post
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
