import { ROUTER } from "@/constants";
import { Link } from "react-router-dom";
import "./index.scss";
export default function Footer() {
  return (
    <footer className="footer">
      <div>
        Api powered by&nbsp;
        <a href="https://octokit.github.io/" target="_black">
          octokit.github.io
        </a>
      </div>
      <Link to={ROUTER.HOME}>Home</Link>
    </footer>
  );
}
