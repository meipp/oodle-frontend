import * as React from "react";
import { Button, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  initialValue: string;
  setValue: React.Dispatch<string>;
  onDelete: React.DispatchWithoutAction;
}

export default function EditableColumnTitle({initialValue, setValue, onDelete}: Props) {
  const [state, setState] = React.useState(initialValue);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setState(e.target.value);
    setValue(e.target.value);
  }

  return (
    <>
      <TextField
        className="adornment-no-padding"
        value={state}
        onChange={onChange}
        size="small"
        sx={{
          width: "10rem",
        }}

        InputProps={{
          endAdornment:
          <InputAdornment position="end" sx={{
            m: 0,
            p: 0
          }}>
            <Button onClick={onDelete} sx={{
              minWidth: "32px",
            }}>
              <FontAwesomeIcon icon="trash-alt" />
            </Button>
          </InputAdornment>
        }}
      />
    </>
  );
}
