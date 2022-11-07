import PollViewSimple from "./View/Simple";
import PollViewMatrix from "./View/Matrix";

export default function Poll({poll, id, setLoading}) {
  const props = {poll, id, setLoading};

  return !poll.y
    ? <PollViewSimple {...props}/>
    : <PollViewMatrix {...props}/>;
}
