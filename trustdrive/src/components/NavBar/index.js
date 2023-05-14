import "./index.scss";

import { Link } from "react-router-dom";

export default function NavBar() {
    return <div className="nav">
        <Link to="/">TrustDrive</Link>
    </div>
}