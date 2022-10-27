import * as React from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from '@mui/material/Divider';
import Poll from "./Poll";
import { Box, Button, Input } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../config";

const theme = createTheme();

export default function PollView() {
  let navigate = useNavigate();

  const [title, setTitle] = React.useState("Title");
  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  const [description, setDescription] = React.useState("Description");
  function onChangeDescription(e) {
    setDescription(e.target.value);
  }

  const [options, setOptions] = React.useState("Option A\nOption B\nOption C");
  const [x, setX] = React.useState(["Option A", "Option B", "Option C"]);
  function onChangeOptions(e) {
    const lines = e.target.value.split("\n");
    setX(lines.map(l => l.trim()).filter(l => l));
    setOptions(e.target.value);
  }

  async function create(event) {
    event.preventDefault();

    const url = `${API_URL}/poll`;
    console.log(`POST ${url} ${JSON.stringify(poll)}`);
    const { data: id } = await axios.post(url, poll);
    console.log(id);
    navigate(`/poll/${id}`);
  }

  const id = undefined;
  const poll = { title, description, x };
  const setLoading = () => {};

  return (
    <ThemeProvider theme={theme}>
      {/* <Container component="main" maxWidth="xs"> */}
        <CssBaseline />
        <div
          style={{
            display: "flex",
            justifyContent: 'center',
            gap: "5rem",
            marginTop: "2rem"
          }}
        >
          <div
            style={{
              display: "block",
            }}
          >
            <Box sx={{
              mt: 8
            }}>
              <Input value={title} onChange={onChangeTitle} fullWidth/>
              <br/>
              <br/>
              <Input value={description} onChange={onChangeDescription} fullWidth multiline/>
              <br/>
              <br/>
              <br/>
              <Input value={options} onChange={onChangeOptions} fullWidth multiline/>
              <Button
                onClick={create}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create
              </Button>
            </Box>
          </div>
          <Divider orientation="vertical" flexItem/>
          <Poll poll={poll} id={id} setLoading={setLoading}></Poll>
        </div>
      {/* </Container> */}
    </ThemeProvider>
  );
}
