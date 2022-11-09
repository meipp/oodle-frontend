import PollViewSimple from "./View/Simple";
import PollViewMatrix from "./View/Matrix";
import { Poll } from "../../types/Poll";

type Props = {
  poll: Poll;
  id: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PollComponent({poll, id, setLoading}: Props) {
  const props = {poll, id, setLoading};

  return !poll.y
    ? <PollViewSimple {...props}/>
    : <PollViewMatrix {...props}/>;
}
