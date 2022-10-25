import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import SelectionButton from "./SelectionButton";
import { useParams, useNavigate } from "react-router-dom";
import { TableBody, TableHead } from "@mui/material";
import { API_URL } from "../../config";
import Selection from "./Selection";

const theme = createTheme();

export default function Poll() {
  const { id } = useParams();
  const [poll, setPoll] = React.useState({ title: "Loading", x: [] });
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  function handleChange(e) {
    setName(e.target.value);
  }

  let navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const selections = poll.x.map((x, i) => ({
      x,
      selection: document.getElementById(`selection-${i}`).value || "unknown",
    }));
    const data = { name, selections };
    const url = `${API_URL}/poll/respond/${id}`;
    console.log(`POST ${url} ${JSON.stringify(data)}`);

    await axios.post(url, data);
    setLoading(true);
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${API_URL}/poll/${id}`, {
          headers: {},
        });
        setPoll(data);
        setLoading(false);
      } catch {}
    }
    fetchData();
  }, [id, loading]);

  function makeIcon(x, selections) {
    const selection =
      selections.find((selection) => selection.x === x)?.selection || "unknown";
    return <Selection state={selection}></Selection>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {poll.title}
          </Typography>
          <Typography variant="subtitle1" color="default">
            {poll.description}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell> {/* empty cell */}
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
                  {poll.x.map((x, i) => (
                    <TableCell key={i}>
                      <SelectionButton
                        selection_id={`selection-${i}`}
                        onClick={(e) => console.log(e.message)}
                      ></SelectionButton>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>

            <Button
              onClick={submit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
