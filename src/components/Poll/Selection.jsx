import Button from "@mui/material/Button";
import fontawesome from "@fortawesome/fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faQuestion, faBan } from "@fortawesome/fontawesome-free-solid";

fontawesome.library.add(faCheck, faBan, faQuestion);

export default function Selection({state, onClick}) {
  const disabled = onClick === undefined;

  // make a props object containing color only if the button is disabled
  const color = (color) => disabled ? {color} : {};

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
