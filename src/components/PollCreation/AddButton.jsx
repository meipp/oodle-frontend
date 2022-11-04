import * as React from "react";
import { Button, TableCell } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddButton({onClick}) {
  return (
    <TableCell align="center" sx={{ p: 0, m: 0 }}>
      <Button
        onClick={onClick}
        sx={{
          px: 0,
          minWidth: "32px",
        }}
      >
        <FontAwesomeIcon icon="plus"/>
      </Button>
    </TableCell>
  );
}
