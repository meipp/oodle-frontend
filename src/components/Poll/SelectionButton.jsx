import * as React from "react";
import Selection from "./Selection";

function successor(array, item) {
  const index = (array.indexOf(item) + 1) % array.length;
  return array[index];
}

export default function SelectionButton({ selection_id }) {
  const [selection, setSelection] = React.useState("unknown");

  function handleOnclick() {
    const next = successor(["yes", "no", "unknown"], selection);
    setSelection(next);
    document.getElementById(selection_id).value = next;
  }

  return (
    <>
      <Selection state={selection} onClick={handleOnclick}></Selection>
      <span id={selection_id}></span>
    </>
  );
}
