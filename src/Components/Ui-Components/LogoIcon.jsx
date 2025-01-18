import { Link } from "react-router-dom";

const LogoIcon = () => {
    return (
        <div>
            <Link to="/">
                <img className="logo" src="Assets/Images/Logo/AEON PROTOCOL.svg" alt="" />
            </Link>
        </div>
    )
}

export default LogoIcon
