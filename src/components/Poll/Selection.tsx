import Button from "@mui/material/Button";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faQuestion, faBan, faTrashAlt, faPlus, faMinus } from "@fortawesome/fontawesome-free-solid";
import { DispatchWithoutAction } from "react";

fontawesome.library.add(faCheck, faBan, faQuestion, faTrashAlt, faPlus );

type Props = {
  state: "yes" | "no" | "unknown";
  onClick?: DispatchWithoutAction;
}

export default function Selection({state, onClick}: Props) {
  const disabled = onClick === undefined;

  // make a props object containing color only if the button is disabled
  const color = (color: string) => disabled ? {color} : {};

  const icons = {
    yes:     <FontAwesomeIcon {...color("green")} icon="check" />,
    no:      <FontAwesomeIcon {...color("red")} icon="ban" />,
    unknown: <FontAwesomeIcon {...color("gray")} icon="question" />,
  };

  return (
    <Button disabled={disabled} onClick={onClick}>
      {icons[state]}
    </Button>
  );
}
