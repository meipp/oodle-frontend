import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import SelectionButton from "../SelectionButton";
import { Container, Stack, TableBody, TableHead } from "@mui/material";
import { API_URL } from "../../../config";
import Selection from "../Selection";
import { Poll } from "../../../types/Poll";
import EmptyCell from "../../EmptyCell";

type Props = {
  poll: Poll;
  id: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PollViewSimple({poll, id, setLoading}: Props) {
  const [name, setName] = React.useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  const submit = async () => {
    const selections = poll.x.map((x, i) => ({
      x,
      selection: (document.getElementById(`selection-${i}`) as any).value || "unknown",
    }));
    const data = { name, selections };
    const url = `${API_URL}/poll/respond/${id}`;
    console.log(`POST ${url} ${JSON.stringify(data)}`);

    await axios.post(url, data);
    setLoading(true);
  };

  function makeIcon(x: string, selections: {x: string; y?: string; selection: "yes" | "no" | "unknown";}[]) {
    const selection =
      selections.find((selection) => selection.x === x)?.selection || "unknown";
    return <Selection state={selection}></Selection>;
  }

  return (
    <Stack
      sx={{
        marginTop: 8,
        direction: "column",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        {poll.title}
      </Typography>
      <Typography variant="subtitle1" color="default" sx={{ whiteSpace: "pre-line" }}>
        {poll.description}
      </Typography>
      <Container sx={{
        overflow: "auto",
      }}>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <EmptyCell/>
              {poll.x.map((x, i) => (
                <TableCell align="center" key={i}>
                  {x}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(poll.responses || []).map(({ name, selections }, i) => (
              <TableRow key={i}>
                <TableCell>{name}</TableCell>
                {poll.x.map((x, i) => (
                  <TableCell key={i}>{makeIcon(x, selections)}</TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <TextField
                  value={name}
                  onChange={handleChange}
                  placeholder="Your name"
                  sx={{ width: "8em" }}
                ></TextField>
              </TableCell>
              {poll.x.map((_, i) => (
                <TableCell key={i}>
                  <SelectionButton
                    selection_id={`selection-${i}`}
                  ></SelectionButton>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      </Container>
      <Button
          onClick={submit}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
    </Stack>
  );
}
