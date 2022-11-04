import * as React from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Button, Input } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../config";
import Helmet from "react-helmet";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TableBody, TableHead } from "@mui/material";
import EditableColumnTitle from "./EditableColumnTitle";

const theme = createTheme();

export default function PollCreationMatrix() {
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("Title");
  const [description, setDescription] = React.useState("Description");

  function arrayStateMethods(setState) {
    function append(value) {
      setState((a) => [...a, value]);
    }

    function deleteIth(i) {
      setState((a) => a.filter((_, idx) => idx !== i));
    }

    function setIth(i, value) {
      setState((a) => a.map((x, idx) => idx === i ? value : x));
    }

    return [append, deleteIth, setIth];
  }

  const [x, setX] = React.useState(["X1", "X2", "X3"]);
  const [appendX, deleteIthX, setIthX] = arrayStateMethods(setX);
  const [y, setY] = React.useState(["Y1", "Y2"]);
  const [appendY, deleteIthY, setIthY] = arrayStateMethods(setY);

  const poll = { title, description, x, y };

  async function createPoll() {
    const url = `${API_URL}/poll`;
    console.log(`POST ${url} ${JSON.stringify(poll)}`);
    const { data: id } = await axios.post(url, poll);
    console.log(id);
    navigate(`/poll/${id}`);
  }

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>oodle</title>
        <meta name="description" content="oodle polling system"/>
      </Helmet>
      <CssBaseline />

      <>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell> {/* empty cell */}
                  {poll.x.map((x, i) => (
                    <TableCell align="center" key={`x${i}`}>
                      {/* {x} */}
                      <EditableColumnTitle
                        initialValue={x}
                        setValue={(v) => setIthX(i, v)}
                        onAdd={() => appendX("")}
                        onDelete={() => deleteIthX(i)}
                      />
                    </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {( poll.y.map((y, i) => (
                  <>
                    <TableRow key={`y${i}`}>
                      <TableCell align="center">
                        <EditableColumnTitle
                          initialValue={y}
                          setValue={(v) => setIthY(i, v)}
                          onAdd={() => appendY("")}
                          onDelete={() => deleteIthY(i)}
                        />
                      </TableCell>

                      {poll.x.map((x, j) => (
                        <TableCell align="center" key={`y${i}:x${j}`}>
                          {x} + {y}
                          {/* <Selection state="unknown"/> */}
                        </TableCell>
                      ))}
                    </TableRow>
                  </>
                )))}

              </TableBody>
            </Table>

            <Button
              onClick={createPoll}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </>
    </ThemeProvider>
  );
}
