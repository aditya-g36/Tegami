import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const SearchBar = () => {
  return (
    <div
      className="p-2"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 300,
          maxWidth: "100%",
        }}
      >
        <TextField fullWidth label="Search" id="Search" />
      </Box>
    </div>
  );
};

export default SearchBar;
