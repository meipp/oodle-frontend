import * as React from "react";
import Button from "@mui/material/Button";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faQuestion,
  faBan,
} from "@fortawesome/fontawesome-free-solid";

fontawesome.library.add(faCheck, faBan, faQuestion);

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
            return <FontAwesomeIcon icon="check"></FontAwesomeIcon>;
          case "no":
            return <FontAwesomeIcon icon="ban"></FontAwesomeIcon>;
          default:
            return <FontAwesomeIcon icon="question"></FontAwesomeIcon>;
        }
      })()}
      <span id={selection_id}></span>
    </Button>
  );
}
