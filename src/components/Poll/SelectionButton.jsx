import Button from "@mui/material/Button";
import { CheckIcon, Cross1Icon, QuestionMarkIcon } from '@radix-ui/react-icons';
import * as React from "react";

export default function SelectionButton({ selection_id }) {
  const [selection, setSelection] = React.useState("unknown");

  function handleOnclick() {
    let next;
    switch (selection) {
      case "yes":
        next = "no";
        break;
      case "no":
        next = "unknown";
        break;
      default:
        next = "yes";
        break;
    }
    setSelection(next);
    document.getElementById(selection_id).value = next;
  }

  return (
    <Button onClick={handleOnclick}>
      {(() => {
        switch (selection) {
          case "yes":
            return <CheckIcon />;
          case "no":
            return <Cross1Icon />;
          default:
            return <QuestionMarkIcon />;
        }
      })()}
      <span id={selection_id}></span>
    </Button>
  );
}
