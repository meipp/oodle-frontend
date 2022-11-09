import * as React from "react";
import Selection from "./Selection";

function successor<A>(array: A[], item: A) {
  const index = (array.indexOf(item) + 1) % array.length;
  return array[index];
}

type Props = {
  selection_id: string;
  onUpdate?: React.Dispatch<string>;
}

export default function SelectionButton({ selection_id, onUpdate }: Props) {
  const [selection, setSelection] = React.useState<"yes" | "no" | "unknown">("unknown");

  function handleOnclick() {
    const next: "yes" | "no" | "unknown" = successor(["yes", "no", "unknown"], selection);

    if(onUpdate) {
      onUpdate(next);
    }

    setSelection(next);
    (document.getElementById(selection_id) as any).value = next;
  }

  return (
    <>
      <Selection state={selection} onClick={handleOnclick}></Selection>
      <span id={selection_id}></span>
    </>
  );
}
