import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const consonantsExceptD = [
  "b",
  "c",
  "",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export default function Header() {
  let navigate = useNavigate();

  function onClick() {
    navigate("/poll/new");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={onClick}
          >
            {randomElement(consonantsExceptD)}oodle
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
