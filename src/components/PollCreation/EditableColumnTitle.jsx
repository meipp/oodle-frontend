import * as React from "react";
import { Box, Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditableColumnTitle({initialValue, setValue, onAdd, onDelete}) {
  const [state, setState] = React.useState(initialValue);

  function onChange(e) {
    setState(e.target.value);
    setValue(e.target.value);
  }

  return (
    <>
      <Box>
        <Stack>
          <TextField
            value={state}
            onChange={onChange}
            sx={{
              width: "10rem"
            }}
          />

          <Box>
            <Button onClick={onDelete}>
              <FontAwesomeIcon icon="trash-alt" />
            </Button>

            <Button onClick={onAdd}>
              <FontAwesomeIcon icon="plus" />
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
