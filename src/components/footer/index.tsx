import { Link } from "react-router-dom";
import "./index.scss";
import { ROUTER } from "@/constants";
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
