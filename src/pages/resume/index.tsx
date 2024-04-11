import { useParams } from "react-router-dom";

export default function ResumePage() {
  const { username } = useParams();
  if (!username) {
    return <div>No ID!</div>;
  }
  return <div>ResumePage {username}</div>;
}
