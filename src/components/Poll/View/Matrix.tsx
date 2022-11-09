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
import { useParams, useNavigate } from "react-router-dom";
import { TableBody, TableHead } from "@mui/material";
import { API_URL } from "../../../config";
import Selection from "../Selection";
import { Poll } from "../../../types/Poll";
import EmptyCell from "../../EmptyCell";

type Props = {
  poll: Poll;
  id: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PollViewMatrix({poll, id, setLoading}: Props) {
  console.log("reset");

  const userSelections: {x: string; y?: string; selection: "yes" | "no" | "unknown";}[] = [];
  for(const x of poll.x) {
    for(const y of poll.y ?? []) {
      userSelections.push({x, y, selection: "unknown"});
    }
  }

  function makeUserSelection(x: string, y: string, selection: "yes" | "no" | "unknown") {
    const o = userSelections.find(s => s.x === x && s.y === y);
    if(o) {
      o.selection = selection;
    }
    else {
      userSelections.push({x, y, selection});
    }
  }

  function mul(x: number, v: number[]) {
    return v.map(vi => x*vi);
  }

  function add(v1: number[], ...vs: number[][]) {
    const sum = [...v1];

    for(const vi of vs) {
      if(vi.length !== v1.length) {
        throw new Error("Vectors must have the same length.");
      }

      vi.forEach((vij, j) => sum[j] += vij);
    }

    return sum;
  }

  // console.log('hello', add(mul(7, [5, 3, 6]), [1,2,3]));

  function countNSelection(x: string, y: string, selection: "yes" | "no" | "unknown") {
    let n = 0;
    for(const {selections} of poll.responses ?? []) {
      selections.find(s => s.x === x && s.y === y && s.selection === selection) && n++;
    }
    return n;
  }

  function mixColors(nGreen: number, nRed: number, nYellow: number) {
    const n = nGreen + nRed + nYellow;

    const green  = [72, 199, 142];
    const red    = [241, 70, 104];
    const yellow = [255, 224, 138];

    // const [r, g, b] = [0, 1, 2].map(i => nGreen/n*green[i] + nRed/n*red[i] + nYellow/n*yellow[i]);
    const [r, g, b] = add(mul(nGreen/n, green), mul(nRed/n, red), mul(nYellow/n, yellow));
    return `rgb(${r}, ${g}, ${b})`;
  }

  // function gradient(k) {
  //   const n = poll.responses.length;

  //   const color1 = [0xf0, 0x80, 0x80];
  //   const color2 = [0x90, 0xee, 0x90];

  //   const [r, g, b] = [0, 1, 2].map(i => color1[i] + (color2[i]-color1[i])*k/n);

  //   // const r = 255 - k/n*255;
  //   // const g = 0 + k/n*255;
  //   // const b = 0;

  //   return `rgb(${r}, ${g}, ${b})`;
  // }

  async function submit() {
    const data = { name: "unknown name", selections: userSelections };
    const url = `${API_URL}/poll/respond/${id}`;
    console.log(`POST ${url} ${JSON.stringify(data)}`);

    await axios.post(url, data);
    setLoading(true);
  }

  return (
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
      <Typography variant="subtitle1" color="default" sx={{ whiteSpace: "pre-line" }}>
        {poll.description}
      </Typography>
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
            {(poll.y ?? []).map((y, i) => (
              <TableRow key={i}>
                <TableCell>{y}</TableCell>
                {poll.x.map((x, j) => (
                  <TableCell
                    key={`${i}x${j}`}
                    sx={{
                      // m: "10px",
                      // backgroundColor: "green"
                      // background: "linear-gradient(#e66465, #9198e5)"
                      // background: "rgb(0, 0, 99.9)"
                      // background: gradient(countNSelection(x, y, "yes"))
                      background: mixColors(countNSelection(x, y, "yes"), countNSelection(x, y, "no"), countNSelection(x, y, "unknown"))
                      // background: "repeating-linear-gradient(\
                      //   135deg,\
                      //   red,\
                      //   red 10px,\
                      //   green 10px,\
                      //   green 20px,\
                      //   blue 10px,\
                      //   blue 20px\
                      // )"
                    }}
                  >
                    {/* {x}+{y} */}

                    {countNSelection(x, y, "yes")}/{(poll.responses ?? []).length}
                    <SelectionButton
                        selection_id={`selection-${i}`}
                        onUpdate={(s) => makeUserSelection(x, y, s)}
                        // onClick={(e) => console.log(e.message)}
                        // onUpdateState={(s) => console.log(s)}
                    ></SelectionButton>
                </TableCell>
                ))}
              </TableRow>
            ))}
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
  );
}
