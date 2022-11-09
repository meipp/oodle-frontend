import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddButton from "./AddButton";

export default function PollCreationMatrix() {
  const navigate = useNavigate();

  const [title, setTitle] = React.useState("Title");
  const [description, setDescription] = React.useState("Description");

  function arrayStateMethods<A>(setState: React.Dispatch<React.SetStateAction<A[]>>) {
    function append(value: A) {
      setState((a) => [...a, value]);
    }

    function deleteIth(i: number) {
      setState((a) => a.filter((_, idx) => idx !== i));
    }

    function setIth(i: number, value: A) {
      setState((a) => a.map((x, idx) => idx === i ? value : x));
    }

    function insertIth(i: number, value: A) {
      console.log(`insert ${value} at position ${i}`);
      setState((a) => {
        const a2 = [...a];
        a2.splice(i, 0, value);
        return a2;
      });
    }

    return {append, deleteIth, setIth, insertIth};
  }

  const [x, setX] = React.useState(["X1", "X2", "X3"]);
  const {append: appendX, deleteIth: deleteIthX, setIth: setIthX, insertIth: insertIthX} = arrayStateMethods(setX);
  const [y, setY] = React.useState(["Y1", "Y2"]);
  const {append: appendY, deleteIth: deleteIthY, setIth: setIthY, insertIth: insertIthY} = arrayStateMethods(setY);

  const poll = { title, description, x, y };

  async function createPoll() {
    const url = `${API_URL}/poll`;
    console.log(`POST ${url} ${JSON.stringify(poll)}`);
    const { data: id } = await axios.post(url, poll);
    console.log(id);
    navigate(`/poll/${id}`);
  }

  return (
    <>
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
                  <TableCell> {/*empty cell*/} </TableCell>

                  <AddButton onClick={() => insertIthX(0, `<$>`)}/>

                  {poll.x.map((x, i) => (
                    <>
                      <TableCell align="center" key={`x${i}`}>
                        {/* {x} */}
                        <EditableColumnTitle
                          initialValue={x}
                          setValue={(v) => setIthX(i, v)}
                          // onAdd={() => appendX("")}
                          onDelete={() => deleteIthX(i)}
                        />
                      </TableCell>
                      <AddButton onClick={() => insertIthX(i+1, `<${i}>`)}/>
                    </>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {( poll.y.map((y, i) => (
                  <>
                    <TableRow>
                      <AddButton onClick={() => insertIthY(i, `<${i}>`)}/>

                      {poll.x.map((x, j) => (
                        <>
                          <TableCell> {/* empty cell */} </TableCell>
                          <TableCell> {/* empty cell */} </TableCell>
                        </>
                      ))}
                      <TableCell> {/* empty cell */} </TableCell>
                    </TableRow>

                    <TableRow key={`y${i}`}>
                      <TableCell align="center">
                        <EditableColumnTitle
                          initialValue={y}
                          setValue={(v) => setIthY(i, v)}
                          // onAdd={() => appendY("")}
                          onDelete={() => deleteIthY(i)}
                        />
                      </TableCell>

                      {poll.x.map((x, j) => (
                        <>
                          <TableCell> {/* empty cell */} </TableCell>
                          <TableCell align="center" key={`y${i}:x${j}`}>
                            {x} + {y}
                            {/* <Selection state="unknown"/> */}
                          </TableCell>
                        </>
                      ))}
                      <TableCell> {/* empty cell */} </TableCell>
                    </TableRow>
                  </>
                )))}

                <TableRow>
                  <AddButton onClick={() => insertIthY(poll.y.length, `<$>`)}/>

                  {poll.x.map((x, j) => (
                    <>
                      <TableCell> {/* empty cell */} </TableCell>
                      <TableCell> {/* empty cell */} </TableCell>
                    </>
                  ))}
                  <TableCell> {/* empty cell */} </TableCell>
                </TableRow>
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
    </>
  );
}
